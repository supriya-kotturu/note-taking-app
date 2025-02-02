import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const prisma = new PrismaClient();

interface OnlineUser {
  userId: string;
  socketId: string;
}

const onlineUsers = new Map<string, OnlineUser>();
const noteUsers = new Map<string, Set<string>>();

io.on('connection', (socket) => {
  socket.on('join-note', async ({ noteId, userId }) => {
    socket.join(noteId);
    onlineUsers.set(socket.id, { userId, socketId: socket.id });
    
    if (!noteUsers.has(noteId)) {
      noteUsers.set(noteId, new Set());
    }
    noteUsers.get(noteId)?.add(userId);
    
    // Get the current note content and send it to the joining user
    try {
      const note = await prisma.note.findUnique({
        where: { id: noteId },
        select: { content: true }
      });
      if (note) {
        socket.emit('content-change', note.content);
      }
    } catch (error) {
      console.error('Error fetching note content:', error);
    }
    
    io.to(noteId).emit('users-update', Array.from(noteUsers.get(noteId) || []));
  });

  socket.on('update-content', async ({ noteId, content }) => {
    socket.to(noteId).emit('content-change', content);
    
    try {
      await prisma.note.update({
        where: { id: noteId },
        data: { content },
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  });

  socket.on('leave-note', ({ noteId, userId }) => {
    socket.leave(noteId);
    noteUsers.get(noteId)?.delete(userId);
    if (noteUsers.get(noteId)?.size === 0) {
      noteUsers.delete(noteId);
    }
    onlineUsers.delete(socket.id);
    io.to(noteId).emit('users-update', Array.from(noteUsers.get(noteId) || []));
  });

  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      for (const [noteId, users] of noteUsers.entries()) {
        if (users.has(user.userId)) {
          users.delete(user.userId);
          io.to(noteId).emit('users-update', Array.from(users));
        }
      }
      onlineUsers.delete(socket.id);
    }
  });
});

app.use(cors());
app.use(express.json());

app.post('/api/invite', async (req, res) => {
  try {
    const { noteId, email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.note.update({
      where: { id: noteId },
      data: {
        collaborators: {
          push: user.id,
        },
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error inviting user:', error);
    res.status(500).json({ error: 'Failed to invite user' });
  }
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
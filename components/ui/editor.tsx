'use client'

import { useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { socket } from '@/lib/socket';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

interface EditorProps {
  noteId: string;
  initialContent: string;
  collaborators: string[];
}

export function Editor({ noteId, initialContent, collaborators }: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useUser();
  const router = useRouter();
  const contentRef = useRef(content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join-note', { noteId, userId: user?.id });

    socket.on('content-change', (newContent: string) => {
      setContent(newContent);
    });

    socket.on('users-update', (users: string[]) => {
      setOnlineUsers(users);
    });

    const handleSave = async () => {
      try {
        setIsSaving(true);
        const response = await fetch(`/api/notes/${noteId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: contentRef.current }),
        });
        if (!response.ok) throw new Error('Failed to save');
      } catch (error) {
        console.error('Error saving:', error);
      } finally {
        setIsSaving(false);
      }
    };

    // Save content periodically
    const saveInterval = setInterval(handleSave, 5000);

    return () => {
      socket.emit('leave-note', { noteId, userId: user?.id });
      socket.off('content-change');
      socket.off('users-update');
      clearInterval(saveInterval);
    };
  }, [noteId, user?.id]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    socket.emit('update-content', { noteId, content: newContent });
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          {onlineUsers.map((userId) => (
            <div
              key={userId}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
              title="Online user"
            >
              {userId.charAt(0).toUpperCase()}
            </div>
          ))}
          {collaborators
            .filter(id => !onlineUsers.includes(id))
            .map((userId) => (
              <div
                key={userId}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
                title="Offline collaborator"
              >
                {userId.charAt(0).toUpperCase()}
              </div>
            ))}
          {isSaving && (
            <span className="text-sm text-muted-foreground ml-2">
              Saving...
            </span>
          )}
        </div>
        <Button onClick={() => router.push('/notes')}>Back to Notes</Button>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-full min-h-[500px] p-4 rounded-md border bg-card text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Start typing..."
      />
    </div>
  );
}
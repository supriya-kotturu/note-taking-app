# Styling Guide for Components

## Overview
The project uses Tailwind CSS with a custom theme configuration that supports both light and dark modes. The styles are properly configured but may not be visible if not applied correctly.

## How to Apply Styles

1. **Using Tailwind Classes**
   - Components should use Tailwind utility classes directly
   - Example: `className="bg-background text-foreground p-4 rounded-md"`

2. **Using CSS Variables**
   - The theme uses CSS variables defined in `globals.css`
   - Access variables using `hsl(var(--variable-name))`
   - Example: `className="bg-[hsl(var(--background))]"`

3. **Component Examples**
   ```tsx
   // Button example
   <Button className="bg-primary text-primary-foreground">Click me</Button>

   // Container example
   <div className="bg-background text-foreground p-4">Content</div>
   ```

4. **Dark Mode**
   - Dark mode is automatically enabled via the `dark` class on the HTML element
   - All themed components will respond to dark mode automatically
   - Custom components should use the theme variables for consistent styling

## Troubleshooting

If styles are not visible:

1. Ensure you're using the correct class names from Tailwind
2. Verify you're using the theme variables defined in `globals.css`
3. Check that components are wrapped in the proper providers
4. Make sure you're importing `globals.css` in your layout file

## Theme Variables

Key variables available:
- `--background`: Page background
- `--foreground`: Text color
- `--primary`: Primary action color
- `--secondary`: Secondary action color
- `--muted`: Muted elements
- `--accent`: Accent elements
- `--border`: Border colors

Each variable has both light and dark mode values that automatically switch based on the theme.
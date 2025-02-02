# Application Styling Documentation

## Color Scheme
- **Primary Color**: rgb(2, 169, 74) - A vibrant green used for primary actions and highlights
- **Background**: Dark theme with a soft navy tint
- **Text**: Light colors with high contrast against the dark background
- **Accents**: Pastel shades complementing the primary green

## Responsive Design
- Mobile-first approach with breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1400px

## Container Padding
Responsive padding that increases with screen size:
- Default: 1rem
- sm: 2rem
- lg: 4rem
- xl: 5rem
- 2xl: 6rem

## Components
### Editor
- Full-width textarea with responsive padding
- Collapsible header on mobile
- User avatars that wrap on smaller screens
- Dark theme with proper contrast

### Dialog
- Responsive width with margins on mobile
- Centered positioning
- Proper spacing and padding
- Dark theme integration

## Theme Variables
The application uses CSS variables for consistent theming:
- background/foreground for text contrast
- card variants for content areas
- primary colors for interactive elements
- secondary/muted/accent colors for UI hierarchy
- destructive colors for warning states
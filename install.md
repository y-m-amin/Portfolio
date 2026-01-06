# Installation Instructions

## Quick Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## What's New

### ✅ Dark Theme Fixed

- Enforced dark theme across the entire application
- Updated HTML, body, and root elements to use dark background
- Removed light theme variants for consistent dark appearance

### ✅ Skills Section Updated

- **Infinity Marquee**: Two rows of skills moving in opposite directions
- **Actual Logos**: Real technology logos from DevIcons CDN
- **Technologies Included**:
  - JavaScript
  - React
  - Node.js
  - MongoDB
  - Express.js
  - Firebase
  - Python
  - Tailwind CSS
  - SQL (MySQL)

### ✅ React Fast Marquee

- Added `react-fast-marquee` package
- Smooth animations with pause on hover
- Gradient edges for seamless infinite scroll
- Responsive design with hover effects

### ✅ Enhanced Styling

- Improved hover animations
- Better spacing and typography
- Consistent dark theme colors
- Professional logo presentation

## Features

- **Smooth Scrolling**: Navigate between sections seamlessly
- **Responsive Design**: Works on all device sizes
- **Interactive Elements**: Hover effects and animations
- **Modern Tech Stack**: Vite + React + Tailwind CSS
- **Fast Performance**: Optimized builds and hot reloading

## Customization

To customize the skills, edit `src/components/Skills.jsx` and update the `skills` array with your preferred technologies and their corresponding DevIcons URLs.

## Troubleshooting

If you encounter any issues:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear browser cache
4. Restart the development server

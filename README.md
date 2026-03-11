# Productivity Dashboard

A beautiful, lightweight productivity dashboard built with vanilla HTML, CSS, and JavaScript. Features a modern gradient design with smooth animations and full offline capability.

## ✨ Features

- **🌅 Smart Greeting** - Time-aware greeting that changes throughout the day
- **⏱️ Customizable Focus Timer** - Pomodoro timer with 7 preset durations (5-60 minutes)
- **✅ Task Management** - Create, edit, complete, and delete tasks with duplicate prevention
- **🔗 Quick Links** - Save and access your favorite websites instantly
- **💾 Auto-Save** - All data persists locally in your browser
- **🎨 Modern Design** - Beautiful gradient UI with smooth animations
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **🔒 Secure** - XSS prevention and input validation built-in
- **⚡ Fast** - Optimized performance with event delegation

## 🚀 Quick Start

Simply open `index.html` in your web browser. No installation or build process required!

```bash
# Clone or download this repository
# Then open index.html in your browser
```

## 📁 Project Structure

```
productivity-dashboard/
├── index.html          # Main application
├── css/
│   └── styles.css     # All styling with modern gradients
├── js/
│   └── app.js         # Application logic (all modules)
└── README.md          # This file
```

## 🎯 How to Use

### Focus Timer
1. Select your preferred duration (5, 10, 15, 25, 30, 45, or 60 minutes)
2. Click **Start** to begin the countdown
3. Click **Stop** to pause, **Reset** to restart

### Task Management
1. Type your task in the input field
2. Click **Add** or press Enter
3. Check the checkbox to mark as complete
4. Click **Edit** to modify or **Delete** to remove
5. Duplicate tasks are automatically prevented

### Quick Links
1. Enter a name and URL for your favorite website
2. Click **Add Link**
3. Click any link card to open in a new tab
4. Click **Delete** to remove a link

## 🎨 Design Features

- **Gradient Background** - Stunning purple-to-violet gradient backdrop
- **Modern Color Palette** - Vibrant indigo/purple theme
- **Smooth Animations** - Cubic-bezier transitions for fluid motion
- **Glass-morphism Effects** - Elevated cards with backdrop blur
- **Gradient Text** - Premium gradient effects on titles
- **Hover Animations** - Cards lift and scale on interaction
- **Responsive Layout** - CSS Grid adapts to any screen size

## 🔧 Technical Details

- **No Dependencies** - Pure vanilla JavaScript, HTML, CSS
- **LocalStorage** - All data stored locally in your browser
- **ES6 Classes** - Modern, maintainable code structure
- **Event Delegation** - Optimized performance
- **XSS Prevention** - Uses textContent instead of innerHTML
- **Input Validation** - Comprehensive validation for all user inputs

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📝 Data Storage

All your tasks and links are stored locally in your browser using LocalStorage:
- Tasks: `productivity-tasks`
- Links: `productivity-links`

Your data never leaves your device and works completely offline.

## 🎓 Features in Detail

### Duplicate Prevention
The dashboard automatically prevents duplicate tasks using case-insensitive comparison. If you try to add "Buy groceries" when it already exists, you'll see a friendly error message.

### Customizable Timer
Choose from 7 preset durations:
- 5 minutes - Quick breaks
- 10 minutes - Short focus sessions
- 15 minutes - Medium tasks
- 25 minutes - Classic Pomodoro
- 30 minutes - Extended focus
- 45 minutes - Deep work
- 60 minutes - Long sessions

### Smart Validation
- Tasks: 1-200 characters, no duplicates
- Links: Valid URLs with auto-prepend of https://
- Security: javascript: protocol blocked

## 🚀 Deployment

This is a static web application that can be deployed anywhere:

1. **GitHub Pages** - Push to a repository and enable Pages
2. **Netlify/Vercel** - Drag and drop the folder
3. **Any Web Server** - Upload files to your hosting
4. **Local Use** - Open index.html directly in your browser

No build process, no server required!

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own needs!

---

**Made with ❤️ using vanilla JavaScript**

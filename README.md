# 🚀 Connectin - React Frontend Application

A modern **React + TypeScript + Vite** social networking platform frontend with real-time communication, job listings, and community engagement features.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Key Features Overview](#key-features-overview)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Contributing](#contributing)

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- User registration and login
- JWT token refresh mechanism
- Persistent session management
- User data synchronization on app load

### 💬 **Real-Time Communication**
- Socket.io integration for live messaging
- Instant notifications
- Real-time event updates

### 💼 **Job Board**
- Job listings and search
- Job application tracking
- Job recommendations

### 📱 **Social Features**
- User profiles and networking
- Connection management
- Post creation and sharing
- Like and comment functionality
- Post recommendations
- Content reporting

### 📅 **Integration Services**
- Google Maps integration
- Calendly integration
- Stripe payment processing
- Whereby video conferencing

### 🎨 **UI/UX**
- Smooth animations (Framer Motion)
- Rich text editor (React Quill)
- Icon library (React Icons)
- Loading spinners and progress indicators
- Tailwind CSS styling with TW Elements

---

## 🛠 Tech Stack

### **Core**
- **React** 18.2.0 - UI framework
- **TypeScript** 5.0.2 - Type safety
- **Vite** 4.4.5 - Build tool & dev server
- **React Router** 6.20.0 - Client-side routing

### **State Management**
- **Redux Toolkit** 1.6.1 - State management
- **Redux Persist** 6.0.0 - State persistence
- **React Redux** 8.1.3 - React bindings

### **Communication**
- **Socket.io Client** 4.7.2 - Real-time events
- **Axios** 1.6.2 - HTTP client
- **Stripe React** 2.3.2 - Payment processing

### **UI & Animations**
- **Framer Motion** 11.0.6 - Smooth animations
- **React Icons** 4.11.0 - Icon library
- **Tailwind CSS** 3.3.3 - Utility-first CSS
- **TW Elements React** 1.0.0 - Pre-built components

### **Utilities**
- **React Quill** 2.0.0 - Rich text editor
- **React Calendly** 4.3.0 - Calendly integration
- **React Timeago** 7.2.0 - Relative time formatting
- **JS Cookie** 3.0.5 - Cookie management
- **Date-and-time** 3.0.3 - Date utilities

### **Development**
- **ESLint** 8.45.0 - Code linting
- **Vite React SWC** 3.3.2 - Fast refresh with SWC
- **PostCSS** 8.4.31 - CSS transformation

---

## 📁 Project Structure

```
src/
├── api/                    # API client configuration
├── assets/                 # Static assets (images, icons)
├── components/             # Reusable React components
│   └── Routes/
│       └── AnimatedRoutes  # Route configuration with animations
├── config/                 # Application configuration
├── context/                # React Context API setup
├── data/                   # Static data files
├── features/               # Feature-based modules
│   ├── auth/               # Authentication module
│   │   ├── hooks/          # useRefreshToken, useFetchUserData
│   │   └── authSlice       # Redux auth reducer
│   ├── post/               # Post management
│   │   └── store/
│   │       └── postSlice   # Redux post reducer
│   ├── job/                # Job listings
│   │   └── jobslice        # Redux job reducer
│   ├── user/               # User & networking
│   │   └── store/
│   │       └── networkslice # Redux network reducer
│   └── common/             # Shared features
│       └── notificationSlice # Redux notifications
├── hooks/                  # Custom React hooks
├── layouts/                # Layout components
│   └── ErrorBoundary       # Error boundary wrapper
├── lib/                    # Utility libraries
├── middleware/             # Redux middleware
├── pages/                  # Page components
├── services/               # Business logic services
├── utils/                  # Helper functions
├── App.tsx                 # Root component
├── main.tsx                # Application entry point
├── store.ts                # Redux store configuration
├── vite-env.d.ts           # Vite environment types
└── index.css               # Global styles
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhinandps/connectin-react.git
   cd connectin-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (create `.env` file)
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_SOCKET_URL=http://localhost:3001
   VITE_STRIPE_KEY=your_stripe_key
   # Add other required environment variables
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

### Development Workflow

```bash
# Start development server
npm run dev

# In another terminal, check for linting issues
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Key Features Overview

### 🔐 **Authentication Flow**
```typescript
// app/hooks/useRefreshToken - Auto-refreshes JWT tokens
// app/hooks/useFetchUserData - Fetches user on app load
```
- Automatic token refresh on app initialization
- Persistent user sessions using Redux Persist
- Seamless re-authentication flow

### 📦 **State Management**
```typescript
// Redux store with multiple slices:
// - auth: User authentication state
// - post: Post management and feed
// - job: Job listings and applications
// - user: Network connections
// - notifications: Real-time notifications
```

### 🎨 **Routing & Navigation**
- Animated route transitions using Framer Motion
- Error boundary for graceful error handling
- Protected route support

### 💾 **Data Persistence**
- Session storage for auth, posts, networks, and notifications
- Automatic state rehydration on app load

---

## 🏗 Architecture

### **Redux Store Architecture**
```
Store
├── auth (persisted)
│   └── User credentials, tokens, profile
├── post (persisted)
│   └── Feed, posts, comments, likes
├── job
│   └── Job listings, applications
├── user (persisted)
│   └── Network, connections, followers
└── notifications (persisted)
    └── Real-time alerts
```

### **Component Hierarchy**
```
App
├── ErrorBoundary
├── Router
│   └── AnimatedRoutes
│       ├── Protected Routes
│       └── Public Routes
```

---

## ⚙️ Configuration

### **Build Configuration** (vite.config.ts)
- Uses Vite React SWC plugin for fast refresh
- Optimized for TypeScript development

### **Redux Persist Config**
```typescript
// Each slice has its own persist config
storageEngine: sessionStorage
persistVersion: 1
```

### **ESLint Rules**
- TypeScript-aware linting
- React hooks validation
- React refresh support

---

## 🚧 Development Roadmap

### TODO Features
- [ ] Complete post creation, likes, comments
- [ ] Post recommendations algorithm
- [ ] User management service
- [ ] Admin user management interface
- [ ] Moderator content dashboard
- [ ] Enhanced profile image uploads

### FIXME/Known Issues
- [ ] Mobile OTP implementation
- [ ] Email confirmation resend
- [ ] Password reset OTP resend
- [ ] Confirmation page styling
- [ ] Standard animation patterns
- [ ] 404 & unauthorized page designs

---

## 📦 Key Dependencies

### State & Data
- `@reduxjs/toolkit` - Simplified Redux
- `redux-persist` - Persist Redux state
- `axios` - HTTP requests

### UI Components
- `framer-motion` - Animations
- `react-icons` - Icon library
- `tw-elements-react` - Tailwind components
- `react-quill` - Rich text editor

### Real-Time
- `socket.io-client` - WebSocket communication

### Integrations
- `@stripe/react-stripe-js` - Stripe payments
- `react-calendly` - Calendar integration
- `@whereby.com/browser-sdk` - Video conferencing

---

## 🔧 Development Tips

### **Fast Refresh**
Changes to React components will hot-reload without losing state:
```bash
npm run dev
```

### **Type Checking**
```bash
npm run build  # Includes TypeScript compilation
```

### **Linting**
```bash
npm run lint   # Check code style
```

### **Using Redux DevTools**
Install Redux DevTools browser extension to inspect state:
- View actions and state changes
- Time-travel debugging
- Dispatch actions manually

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules
- Use TypeScript for type safety
- Write meaningful commit messages

---

## 📄 License

This project is open source. See LICENSE file for details.

---

## 📞 Support & Contact

For issues and questions:
- 📧 Open an issue on GitHub
- 💬 Create a discussion
- 🐛 Report bugs with detailed information

---

## 🙏 Acknowledgments

Built with:
- ⚡ [Vite](https://vitejs.dev/) - Next generation frontend tooling
- ⚛️ [React](https://react.dev/) - JavaScript library for building UIs
- 🔷 [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- 🎭 [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**Last Updated:** December 2024 | **Version:** 0.0.0

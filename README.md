# Smart Login App

<p align="center">
  <img src="public/icon.png" width="128" alt="Smart Login Logo">
</p>

A modern, secure, and animated login application built with Tauri, React, and TypeScript. Features a beautiful UI with smooth animations and a clean user experience.

## 📦 Releases

Download the latest version of the application from the [Releases](https://github.com/Sn0wEmpress/tauri-react-smart-login/releases) page.

## ✨ Features

- 🎨 Beautiful, responsive UI with smooth animations
- 🔒 Secure login with form validation
- ⚡ Ultra-fast performance with Tauri
- 🎭 Customizable animation effects
- 🌓 Dark mode support
- 🖥️ Native desktop experience

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Rust](https://www.rust-lang.org/tools/install)
- [Bun](https://bun.sh/) (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sn0wEmpress/tauri-react-smart-login.git
   cd tauri-react-smart-login
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun tauri dev
   ```

4. For production build:
   ```bash
   bun tauri build
   ```

## 🎮 Usage

1. Launch the application
2. Enter your credentials (default: username: `123`, password: `123`)
3. Experience the smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Desktop**: Tauri 2.0
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Animation**: Custom UltraInstinct animation system

## 🎨 Customization

You can customize the animations by modifying the `useElementRef` hook in `src/pages/Login.tsx`:

```typescript
const signInRef = useElementRef<HTMLButtonElement>({ 
  animationSpeed: 50, 
  trailDuration: 200, 
  returnDelay: 0 
});
```

## 📦 Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
│   ├── Login.tsx    # Login page
│   └── Greeting.tsx # Welcome page
├── utils/           # Utility functions
└── App.tsx         # Main application component
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) for the amazing desktop app framework
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

Made with ❤️ by Snow Empress
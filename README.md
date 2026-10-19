# 🌌 Guruvishnu Kajagar — Interactive 3D Developer Portfolio

[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.174-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Motion](https://img.shields.io/badge/Motion-v12-FF4154?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-96%2B-00C853?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developer.chrome.com/docs/lighthouse/)

> A high-performance, immersive developer portfolio featuring interactive 3D WebGL scenes, a live GitHub telemetry dashboard, a solar-orbit skills visualizer, an interactive component sandbox, and an embedded AI portfolio assistant.

---

## ⚡ Highlights & Key Features

- **🪐 3D WebGL Galaxy & Project Deck**: Built with `@react-three/fiber` and `@react-three/drei`, rendering interactive 3D particle fields and tactile 3D cards.
- **📊 Real-Time GitHub Telemetry**: Live GitHub REST API integration displaying recent commits, language distribution, and a contribution heatmap.
- **🌌 Solar System Skills Orbit**: Dynamic 3-tier orbital system (`Core`, `Backend`, `Craft`) with interactive skill popovers and level metrics.
- **💻 macOS Terminal Boot Simulator**: Custom typing sequence emulator demonstrating command initialization and hire status.
- **🎛️ Live Component Playground**: Interactive sandbox allowing visitors to modify theme tokens, animation speeds, and inspect component node trees in real time.
- **🤖 Guru AI Portfolio Assistant**: Embedded conversational assistant capable of answering questions about skills, experience, and contact details.
- **🌊 Inertia Smooth Scrolling**: Butter-smooth momentum scrolling powered by `lenis` and custom hooks.
- **⚡ Strict Type Safety & Performance**: 100% TypeScript strict mode, React 19 concurrent features, Vite 6 bundler, and 95+ target Lighthouse scores.

---

## 🛠️ Tech Stack & Packages

### **Core Frontend**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` / `react-dom` | `^19.0.0` | Latest React 19 runtime with concurrent rendering features |
| `typescript` | `^5.7.3` | End-to-end type safety, strict interfaces, and generics |
| `vite` | `^6.1.1` | Next-generation frontend build tooling and instant HMR |

### **3D & WebGL Graphics**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `three` | `^0.174.0` | 3D WebGL rendering engine |
| `@react-three/fiber` | `^9.0.4` | Declarative, component-driven Three.js in React |
| `@react-three/drei` | `^10.0.4` | Canvas helpers, shaders, camera controls, and particle systems |

### **Animations & Motion Physics**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `motion` (Framer Motion) | `^12.4.7` | Gestures, layout springs, stagger orchestrations, and exit animations |
| `gsap` | `^3.12.7` | High-precision timeline and micro-interaction animations |
| `lenis` | `^1.1.20` | Smooth momentum scrolling engine |

### **Styling & UI Primitives**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `tailwindcss` | `^4.0.7` | Utility-first CSS framework (v4 engine) |
| `@tailwindcss/vite` | `^4.0.7` | Official Tailwind CSS v4 Vite integration |
| `clsx` & `tailwind-merge` | Latest | Conditional and conflict-free class name composition |
| `lucide-react` | `^0.475.0` | Clean, modern SVG iconography |

### **Forms, Validation & Visualizations**
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react-hook-form` | `^7.54.2` | Performant, re-render isolated form state management |
| `zod` | `^3.24.2` | TypeScript-first schema declaration and runtime validation |
| `@hookform/resolvers` | `^4.1.0` | Validation resolver connecting Zod directly to React Hook Form |
| `recharts` | `^2.15.1` | Composable charting library for metrics and sparklines |
| `@google/generative-ai` | `^0.24.1` | Google Gemini AI SDK for intelligent conversational responses |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/guruvishnuk/guruvishnu-portfolio.git

# Navigate into the project directory
cd guruvishnu-portfolio

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

### Build for Production

```bash
# Type-check and create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📐 Project Structure

```
src/
├── components/
│   ├── chatbot/          # Guru AI assistant with contextual responses
│   ├── contact/          # Contact panel and Zod-validated form
│   ├── dashboard/        # Performance metrics, counters & sparklines
│   ├── github/           # Live GitHub API telemetry & contribution heatmap
│   ├── hero/             # Hero 3D scene, rotating roles & badges
│   ├── layout/           # Navbar, Footer & PageShell wrappers
│   ├── philosophy/       # Engineering philosophy cards
│   ├── playground/       # Interactive component sandbox & node tree visualizer
│   ├── process/          # Hire me workflow steps
│   ├── profile/          # Flippable 3D profile identity card
│   ├── projects/         # 3D project galaxy deck & live preview modals
│   ├── roadmap/          # Career milestones and experience timeline
│   ├── skills-orbit/     # 3-tier orbital skills visualizer
│   ├── tags/             # Technical tags cloud
│   ├── terminal/         # macOS terminal typewriter boot emulator
│   └── ui/               # Reusable glass cards, magnetic buttons, custom cursor
├── data/                 # Static content, metrics, milestones & project data
├── hooks/                # Custom hooks (Lenis, mouse tracking, typing animation)
├── lib/                  # Motion variants & utility helpers
├── services/             # GitHub API integration & caching
└── types/                # Strict TypeScript interfaces
```

---

## 👤 Author

**Guruvishnu Kajagar**  
*Frontend Engineer @ CandorWorks*
- **GitHub**: [@guruvishnuk](https://github.com/guruvishnuk)
- **LinkedIn**: [guruvishnu-kajagar](https://www.linkedin.com/in/guruvishnu-kajagar-)
- **Email**: guruvishnu1927@gmail.com

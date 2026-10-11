# ⚛️ React Learning Lab: Hands-On Concept Mastery

Welcome to **React Learning Lab**! This project is an interactive, frontend-only learning environment specifically crafted to teach you all the core concepts of React.js from the ground up.

Every single line of code across all concept modules, hooks, and context providers includes **pedagogical comments** explaining:
- **What this line does**
- **The React concept at play**
- **Why it is written this way**
- **Common beginner mistakes and traps to avoid**

---

## 🚀 How to Run the Project

Open your terminal in this directory:

```bash
# 1. Navigate to the project directory (if not already there)
cd C:\Users\jsath\.gemini\antigravity\scratch\react-learning-lab

# 2. Start the Vite development server with Hot Module Replacement (HMR)
npm run dev
```

Once running, open your browser at the local URL shown in your terminal (usually **`http://localhost:5173`**).

---

## 🗺️ Learning Roadmap & Modules

| Module | Topic | Core React Concepts Covered | File Location |
| :--- | :--- | :--- | :--- |
| **01** | **JSX & Expressions** | JSX compilation, `{}` JS evaluation, Fragments `<>`, attribute rules, camelCase, inline styles. | `src/concepts/01-JSX/JsxDemo.jsx` |
| **02** | **Functional Components** | Pure functions, PascalCase, return statements, component tree, reusability, composition. | `src/concepts/02-Components/ComponentsDemo.jsx` |
| **03** | **Props & Data Flow** | Unidirectional data flow, prop destructuring, default props, `children` prop, callbacks. | `src/concepts/03-Props/PropsDemo.jsx` |
| **04** | **State (`useState`)** | Reactive memory, functional updater `prev => ...`, object immutability (`{...prev}`), array state (`[...prev]`). | `src/concepts/04-State/StateDemo.jsx` |
| **05** | **Event Handling** | `SyntheticEvent`, `onClick`, `onChange`, `onSubmit`, `e.preventDefault()`, passing custom parameters. | `src/concepts/05-Events/EventsDemo.jsx` |
| **06** | **Conditional Rendering** | Ternary `? :`, logical AND `&&`, the "Zero Trap" (`0 && ...`), early return pattern, `null` rendering. | `src/concepts/06-ConditionalRendering/ConditionalDemo.jsx` |
| **07** | **Lists & Keys** | Array `.map()`, why the `key` prop matters for Virtual DOM reconciliation, index key pitfalls. | `src/concepts/07-ListsAndKeys/ListsDemo.jsx` |
| **08** | **Side Effects (`useEffect`)** | Component lifecycle, mount, update, unmount, dependency arrays (`[]`, `[dep]`), cleanup functions. | `src/concepts/08-UseEffect/UseEffectDemo.jsx` |
| **09** | **Forms & Controlled Inputs** | Single source of truth, `value` + `onChange`, computed property keys `[name]`, validation, reset. | `src/concepts/09-Forms/FormsDemo.jsx` |
| **10** | **DOM & Persistence (`useRef`)** | Direct DOM node access (`.focus()`), persisting mutable values across renders WITHOUT re-rendering. | `src/concepts/10-UseRef/UseRefDemo.jsx` |
| **11** | **Context API (`useContext`)** | Solving Prop Drilling, `createContext()`, `<Context.Provider>`, consuming via `useContext()`. | `src/concepts/11-Context/ContextDemo.jsx` |
| **12** | **Custom Hooks** | Extracting reusable logic, naming rules (`use...`), building `useLocalStorage` & `useToggle`. | `src/concepts/12-CustomHooks/CustomHooksDemo.jsx` |

---

## 📂 Project Architecture

```text
react-learning-lab/
├── index.html                   # HTML entry point with <div id="root">
├── package.json                 # React 19 + Vite 8 dependencies
├── src/
│   ├── main.jsx                 # Entry point: createRoot() & <StrictMode>
│   ├── App.jsx                  # Main dashboard shell & navigation
│   ├── index.css                # Modern responsive design & Dark/Light mode tokens
│   ├── context/
│   │   └── ThemeContext.jsx     # Context provider with line-by-line annotations
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Custom hook syncing state with browser localStorage
│   │   └── useToggle.js         # Custom hook for boolean toggles
│   ├── concepts/
│   │   ├── 01-JSX/              # Line-by-line annotated JSX demo
│   │   ├── 02-Components/       # Functional components & composition
│   │   ├── 03-Props/            # Props, default props & children
│   │   ├── 04-State/            # useState, functional updates & immutability
│   │   ├── 05-Events/           # SyntheticEvents & preventing default reloads
│   │   ├── 06-ConditionalRendering/ # Ternary, logical AND & early returns
│   │   ├── 07-ListsAndKeys/     # map() & key reconciliation
│   │   ├── 08-UseEffect/        # Side effects & cleanup functions
│   │   ├── 09-Forms/            # Controlled form components & validation
│   │   ├── 10-UseRef/           # DOM refs & non-rendering mutable state
│   │   ├── 11-Context/          # Prop drilling solution with Context API
│   │   └── 12-CustomHooks/      # Packaging custom hooks
│   ├── components/
│   │   ├── Navbar.jsx           # Header with progress & theme toggle
│   │   ├── Sidebar.jsx          # Searchable concept navigation
│   │   ├── ConceptCard.jsx      # 3-tab layout (Demo, Code, Challenge)
│   │   └── CodeViewer.jsx       # In-browser code inspector with line numbers
│   └── data/
│       └── conceptsList.js      # Concept registry & quick snippets
```

---

## 🛠️ Recommended Hands-on Study Workflow

For every module:
1. **Explore the Interactive Demo**: Run `npm run dev` and click, type, and test the feature live in your browser.
2. **Inspect the Annotated Source File**: Open the corresponding file in your code editor (e.g., `src/concepts/04-State/StateDemo.jsx`). Read each line and its explanation comment.
3. **Take the Hands-On Challenge**: Check the **"Coding Challenge"** tab in the app or the `.challenge` property in the file. Make the requested edit in the code, save it, and watch Vite update your browser in real time!
4. **Mark as Mastered**: Click the "Mark as Mastered" button in the app to track your learning progress.

// Line 1: Import StrictMode component from 'react'.
// Concept: StrictMode runs extra checks in development (like double-invoking effects) to detect bugs and side effect issues.
import { StrictMode } from 'react';

// Line 5: Import createRoot function from 'react-dom/client'.
// Concept: createRoot is the entry point API that mounts React's Concurrent Virtual DOM into the HTML page.
import { createRoot } from 'react-dom/client';

// Line 9: Import global CSS styling rules.
import './index.css';

// Line 12: Import our top-level App component from './App.jsx'.
import App from './App.jsx';

// Line 15: document.getElementById('root') finds the empty <div id="root"> element inside index.html.
const rootElement = document.getElementById('root');

// Line 18: createRoot creates a React root container attached to the DOM element.
const reactRoot = createRoot(rootElement);

// Line 21: .render() instructs React to convert JSX component hierarchy into real HTML DOM elements.
reactRoot.render(
  // Line 23: StrictMode wraps the entire application with development safety checks.
  <StrictMode>
    {/* Line 25: Mount our main root App component */}
    <App />
  </StrictMode>
);

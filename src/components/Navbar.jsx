// Line 1: Import useContext from 'react' to consume ThemeContext.
import { useContext } from 'react';
// Line 3: Import ThemeContext from context directory.
import { ThemeContext } from '../context/ThemeContext';
// Line 5: Import Lucide icons for UI polish.
import { Sun, Moon, CheckCircle2, BookOpen } from 'lucide-react';

// Line 8: Export Navbar component.
// Concept: Pure functional component consuming context and rendering top application bar.
export function Navbar({ totalConcepts = 12 }) {
  // Line 11: Destructure context values using the useContext hook.
  const { theme, toggleTheme, completedConcepts } = useContext(ThemeContext);

  // Line 14: Calculate completion percentage.
  const progressPercent = Math.round((completedConcepts.length / totalConcepts) * 100);

  // Line 17: Return JSX markup.
  return (
    <header className="app-navbar">
      {/* Brand title */}
      <div className="navbar-brand">
        <div className="brand-icon">
          <BookOpen size={22} color="#ffffff" />
        </div>
        <div>
          <h1 className="brand-title">React Learning Lab</h1>
          <span className="brand-subtitle">Hands-On Concept Mastery & Annotated Code</span>
        </div>
      </div>

      {/* Progress & Theme Toggle */}
      <div className="navbar-actions">
        {/* Progress pill */}
        <div className="progress-badge">
          <CheckCircle2 size={16} color="#10b981" />
          <span>
            {completedConcepts.length} of {totalConcepts} Mastered ({progressPercent}%)
          </span>
          <div className="progress-bar-mini">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Dark/Light mode switcher */}
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </header>
  );
}

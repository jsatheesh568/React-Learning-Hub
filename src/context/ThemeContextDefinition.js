// Line 1: Import createContext from 'react'.
import { createContext } from 'react';

// Line 4: Define and export the ThemeContext object.
// Concept: Keeping Context creation in a pure JS file ensures 100% Vite Fast Refresh compatibility.
export const ThemeContext = createContext({
  theme: 'light',                     // Default theme string
  toggleTheme: () => {},              // Placeholder function
  completedConcepts: [],              // Array of concept IDs the student marked as learned
  toggleConceptCompleted: () => {}    // Function to toggle a concept completion
});

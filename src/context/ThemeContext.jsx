// Line 1: Import useState and useEffect hooks from 'react'.
import { useState, useEffect } from 'react';
// Line 3: Import ThemeContext definition.
import { ThemeContext } from './ThemeContextDefinition';
export { ThemeContext };

// Line 13: Define a Provider Component that wraps children and supplies the state to all descendants.
export function ThemeProvider({ children }) {
  // Line 15: Initialize 'theme' state from localStorage if available, otherwise default to 'light'.
  // Line 16: The useState hook creates a state variable 'theme' and its updater function 'setTheme'.
  const [theme, setTheme] = useState(() => {
    // Line 18: Lazy initial state function - runs only once on initial component mount to avoid redundant reads.
    return localStorage.getItem('react_lab_theme') || 'light';
  });

  // Line 22: Initialize 'completedConcepts' state to track user learning progress across sessions.
  const [completedConcepts, setCompletedConcepts] = useState(() => {
    // Line 24: Read saved completed concept IDs from localStorage or default to empty array.
    const saved = localStorage.getItem('react_lab_completed');
    // Line 26: JSON.parse converts the JSON string back into a JavaScript array.
    return saved ? JSON.parse(saved) : [];
  });

  // Line 30: useEffect synchronizes our 'theme' state with the document root HTML element and localStorage.
  useEffect(() => {
    // Line 32: Apply data-theme attribute on <html> element so CSS variables update globally.
    document.documentElement.setAttribute('data-theme', theme);
    // Line 34: Persist the current theme choice in the browser's localStorage.
    localStorage.setItem('react_lab_theme', theme);
  }, [theme]); // Line 36: Dependency array [theme] ensures this effect runs ONLY when 'theme' changes.

  // Line 38: useEffect synchronizes the 'completedConcepts' state to localStorage whenever it changes.
  useEffect(() => {
    // Line 40: JSON.stringify converts our array into a string for localStorage storage.
    localStorage.setItem('react_lab_completed', JSON.stringify(completedConcepts));
  }, [completedConcepts]); // Line 42: Dependency array [completedConcepts] tracks changes to completion list.

  // Line 44: Define toggleTheme helper function to switch between 'light' and 'dark'.
  const toggleTheme = () => {
    // Line 46: Functional state update (prevTheme => ...) ensures we work with the most recent state value.
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Line 50: Define helper function to mark a concept as completed or uncompleted.
  const toggleConceptCompleted = (conceptId) => {
    // Line 52: Use functional update to immutably add or remove the concept ID.
    setCompletedConcepts(prev => {
      // Line 54: Check if concept is already marked as completed.
      if (prev.includes(conceptId)) {
        // Line 56: Immutably filter out the item if it already exists.
        return prev.filter(id => id !== conceptId);
      } else {
        // Line 59: Immutably add the item using JavaScript array spread operator [...prev, conceptId].
        return [...prev, conceptId];
      }
    });
  };

  // Line 65: Assemble the value object containing the data and functions we want to make available.
  const value = {
    theme,
    toggleTheme,
    completedConcepts,
    toggleConceptCompleted
  };

  // Line 74: Return ThemeContext.Provider passing 'value', wrapping 'children' so nested components have access.
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

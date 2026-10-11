// Line 1: Import useState and useEffect hooks from React.
import { useState, useEffect } from 'react';

// Line 4: Define a custom hook named useLocalStorage.
// Custom Hook Concept: Hook names MUST start with "use" so React's linter can enforce Rules of Hooks.
export function useLocalStorage(key, initialValue) {
  // Line 8: Initialize state using a lazy initializer function.
  // Concept: A function passed to useState runs only on initial mount, not on every re-render.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Line 12: Try to retrieve the existing item from browser window.localStorage by key.
      const item = window.localStorage.getItem(key);
      // Line 14: If item exists in storage, parse JSON string into JS data; otherwise return initialValue.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Line 17: Fallback in case of JSON parse errors or restricted storage permissions.
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Line 23: useEffect synchronizes our React state with the external localStorage browser API.
  // Concept: Side effects (like writing to localStorage) should always happen inside useEffect, not in render body.
  useEffect(() => {
    try {
      // Line 27: Serialize our JS state value to JSON and store it in localStorage under the given key.
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Line 30: Catch possible quota exceeded errors or security errors in iframe environments.
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]); // Line 33: Dependency Array: Re-run this effect only when key or storedValue changes.

  // Line 35: Return a tuple [storedValue, setStoredValue] just like standard useState does.
  // Concept: Returning an array lets the consuming component name the variables whatever they want via destructuring.
  return [storedValue, setStoredValue];
}

// Line 1: Import useState hook from the core 'react' library.
import { useState } from 'react';

// Line 4: Define a custom hook named 'useToggle' that manages boolean toggle state.
// Concept: Custom hooks allow you to package and reuse stateful logic across multiple components.
export function useToggle(initialValue = false) {
  // Line 7: Declare a boolean state variable 'state' initialized to initialValue (default false).
  // Concept: useState returns a pair: the current state value and a function to update it.
  const [state, setState] = useState(initialValue);

  // Line 11: Declare a memoizable/clean toggle function.
  // Concept: We use functional updater (prev => !prev) so it always inverts the most accurate previous state.
  const toggle = () => {
    setState(prev => !prev);
  };

  // Line 17: Return an array with [currentValue, toggleFunction, directSetterFunction].
  // Concept: Returning both toggle() and setState allows consumers to either flip or force true/false.
  return [state, toggle, setState];
}

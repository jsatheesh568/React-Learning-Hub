// Line 1: Import useRef, useState, and useEffect from 'react'.
import { useRef, useState, useEffect } from 'react';

// Line 4: MAIN EXPORTED COMPONENT: UseRefDemo
// Concept: useRef returns a mutable object whose .current property persists across renders WITHOUT triggering re-renders.
export function UseRefDemo() {
  // Line 7: Standard state variable to trigger component re-renders.
  const [inputText, setTextInput] = useState('');
  
  // Line 10: USE CASE 1: Direct DOM element reference.
  // Concept: Attach this ref to an element using ref={inputElementRef} to access raw DOM methods.
  const inputElementRef = useRef(null);

  // Line 14: USE CASE 2: Persisting a mutable value without triggering re-render (Render Counter).
  // Concept: If we stored renderCount in useState and updated it during render, it would cause an infinite loop!
  const renderCount = useRef(1);

  // Line 18: USE CASE 3: Storing previous state value.
  // Line 20: State to snapshot ref values on user request.
  // Concept: React Compiler Rule: Refs should be accessed outside render (in event handlers or effects).
  const [refSnapshot, setRefSnapshot] = useState({
    renders: 1,
    prevText: ''
  });

  // Line 27: Handler to read mutable refs outside render body.
  const handleInspectRefs = () => {
    setRefSnapshot({
      renders: renderCount.current,
      prevText: prevTextRef.current
    });
  };

  // Line 35: useEffect running on every render to track count and previous state.
  useEffect(() => {
    // Line 37: Increment the ref's .current value. Mutating .current does NOT trigger a re-render!
    renderCount.current = renderCount.current + 1;
    // Line 39: Store the current text so it becomes "previous text" on next render.
    prevTextRef.current = inputText;
  }); // Line 41: No dependency array = runs on every single render.

  // Line 43: DOM Action 1: Programmatically focus input field.
  const handleFocusClick = () => {
    // Line 45: Access the underlying browser DOM node via inputElementRef.current.
    if (inputElementRef.current) {
      inputElementRef.current.focus();
      inputElementRef.current.style.borderColor = '#6366f1';
    }
  };

  // Line 52: DOM Action 2: Programmatically select all text inside input.
  const handleSelectTextClick = () => {
    if (inputElementRef.current) {
      inputElementRef.current.select();
    }
  };

  // Line 59: Return JSX
  return (
    <div className="demo-container">
      {/* Line 61: Title */}
      <h3 className="demo-title">Module 10: Direct DOM Access & Refs (`useRef` Hook)</h3>

      {/* Line 64: Overview */}
      <p className="demo-description">
        <code>useRef</code> gives you a persistent container. Unlike state, changing <code>ref.current</code>{' '}
        <strong>does not</strong> trigger a component re-render. It is also used to reference physical DOM nodes.
      </p>

      {/* Line 70: Section 1: Direct DOM Manipulation */}
      <div className="interactive-box" style={{ marginBottom: '16px' }}>
        <h4>1. DOM Element Access (Focus & Select)</h4>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          React declarative code rarely touches the DOM directly, but when you need to focus, scroll, or measure elements, <code>useRef</code> is the bridge.
        </p>

        <div style={{ display: 'flex', gap: '8px', margin: '12px 0' }}>
          {/* Line 79: Binding the ref to the native input DOM node */}
          <input
            ref={inputElementRef}
            type="text"
            value={inputText}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Click buttons below to focus or select me..."
            className="input-field"
            style={{ flex: 1 }}
          />
          <button onClick={handleFocusClick} className="btn btn-primary">
            Focus Input
          </button>
          <button onClick={handleSelectTextClick} className="btn btn-outline">
            Select All Text
          </button>
        </div>
      </div>

      {/* Line 98: Section 2: Persisting Values Across Renders */}
      <div className="interactive-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>2. Persisting Values Without Re-rendering</h4>
          <button onClick={handleInspectRefs} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
            Snapshot / Read ref.current
          </button>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 10px 0' }}>
          Type in the box above, then click "Snapshot / Read ref.current" to read persistent values without triggering unnecessary render loops.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current State:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>"{inputText || '(empty)'}"</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Previous Text (read via ref):</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#a855f7' }}>"{refSnapshot.prevText || '(none)'}"</div>
          </div>
          <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Renders Tracked in ref:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981' }}>{refSnapshot.renders} times</div>
          </div>
        </div>
      </div>

      {/* Line 106: Summary Card */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>State vs Ref Comparison:</strong>
        <table style={{ width: '100%', fontSize: '0.85rem', marginTop: '8px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '6px' }}>Feature</th>
              <th style={{ padding: '6px' }}>useState</th>
              <th style={{ padding: '6px' }}>useRef</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '6px' }}>Triggers Re-render?</td>
              <td style={{ padding: '6px', color: '#10b981' }}>Yes (updates the UI)</td>
              <td style={{ padding: '6px', color: '#ef4444' }}>No (silent update)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #1e293b' }}>
              <td style={{ padding: '6px' }}>Mutability</td>
              <td style={{ padding: '6px' }}>Immutable (must use setter)</td>
              <td style={{ padding: '6px' }}>Mutable (modify .current directly)</td>
            </tr>
            <tr>
              <td style={{ padding: '6px' }}>Primary Purpose</td>
              <td style={{ padding: '6px' }}>Data that drives what appears on screen</td>
              <td style={{ padding: '6px' }}>DOM references, timer IDs, non-visual data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Line 140: Metadata
UseRefDemo.conceptInfo = {
  id: '10-useref',
  title: '10. DOM & Persistence (`useRef`)',
  level: 'Intermediate',
  file: 'src/concepts/10-UseRef/UseRefDemo.jsx',
  summary: 'Learn direct DOM element manipulation, maintaining persistent mutable variables without re-rendering, and render counters.',
  keyTakeaways: [
    'useRef returns an object with a mutable .current property.',
    'Changing .current never triggers a component re-render.',
    'Use refs to read or modify native DOM nodes (focus, scroll, measurements).',
    'Do not write to ref.current during rendering; write inside event handlers or useEffect.'
  ],
  challenge: 'Open src/concepts/10-UseRef/UseRefDemo.jsx and add a button that scrolls the page to the bottom using a ref on a footer element.'
};

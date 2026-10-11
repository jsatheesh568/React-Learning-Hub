// Line 1: Import useState from 'react' to track triggered events.
import { useState } from 'react';

// Line 4: MAIN EXPORTED COMPONENT: EventsDemo
// Concept: React uses SyntheticEvents to normalize DOM event handling across all browsers.
export function EventsDemo() {
  // Line 7: State to display an interactive log of captured events.
  const [eventLog, setEventLog] = useState([]);
  // Line 9: State for text input demonstration.
  const [textInput, setTextInput] = useState('');
  // Line 11: State to demonstrate hover state.
  const [isHovered, setIsHovered] = useState(false);

  // Line 14: Helper function to log events to the on-screen console.
  const logEvent = (name, details) => {
    const time = new Date().toLocaleTimeString();
    // Line 17: Functional update to prepend recent event to list
    setEventLog(prev => [{ id: Math.random(), name, details, time }, ...prev.slice(0, 5)]);
  };

  // Line 21: 1. Click Handler without arguments.
  // Concept: Handlers receive the SyntheticEvent object 'e' as the first parameter automatically.
  const handleSimpleClick = (e) => {
    // Line 24: e is a SyntheticEvent wrapping the browser's native MouseEvent
    logEvent('onClick', `Button clicked! Coordinates: (${e.clientX}, ${e.clientY})`);
  };

  // Line 28: 2. Click Handler WITH custom arguments.
  // Concept: Use an arrow function wrapper: onClick={() => handleParamClick('Admin', 42)}
  const handleParamClick = (role, id, _e) => {
    logEvent('onClick (Parameterized)', `Role: ${role}, ID: ${id}`);
  };

  // Line 34: 3. Change Handler for input elements.
  // Concept: e.target.value contains current value typed by the user.
  const handleInputChange = (e) => {
    setTextInput(e.target.value);
    logEvent('onChange', `Value updated to: "${e.target.value}"`);
  };

  // Line 41: 4. Form Submit Handler demonstrating e.preventDefault().
  // Concept: Default HTML form submission refreshes the entire web page. e.preventDefault() prevents this.
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Line 44: Crucial line preventing browser reload!
    logEvent('onSubmit (Prevented Reload)', `Submitted: "${textInput}"`);
    setTextInput('');
  };

  // Line 49: 5. Keyboard Handler for detecting specific keys.
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      logEvent('onKeyDown', `User pressed Enter key!`);
    }
  };

  // Line 56: Render
  return (
    <div className="demo-container">
      {/* Line 58: Title */}
      <h3 className="demo-title">Module 05: Event Handling & SyntheticEvents</h3>

      {/* Line 61: Overview */}
      <p className="demo-description">
        React events are named using camelCase (<code>onClick</code>, <code>onChange</code>).
        They wrap browser native events with cross-browser <code>SyntheticEvent</code>.
      </p>

      {/* Line 67: Common Pitfall Warning Banner */}
      <div className="info-box" style={{ borderLeft: '4px solid #ef4444', backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
        <strong>⚠️ The #1 Beginner Mistake:</strong>
        <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem' }}>
          Never write <code>onClick={'{handleClick()}'}</code> — this calls the function <em>immediately during rendering</em>!
          Always pass the function reference <code>onClick={'{handleClick}'}</code> or an arrow wrapper <code>onClick={'{(e) => handleClick(e)}'}</code>.
        </p>
      </div>

      {/* Line 78: Event Playground */}
      <div className="interactive-box" style={{ marginTop: '16px' }}>
        <h4>Interactive Event Playground:</h4>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0' }}>
          {/* Line 83: Direct function reference */}
          <button onClick={handleSimpleClick} className="btn btn-primary">
            Test onClick (Simple)
          </button>

          {/* Line 88: Arrow function passing custom arguments */}
          <button onClick={(e) => handleParamClick('Moderator', 99, e)} className="btn btn-outline">
            Test onClick with Args ("Moderator", 99)
          </button>

          {/* Line 93: Mouse hover events */}
          <button
            onMouseEnter={() => { setIsHovered(true); logEvent('onMouseEnter', 'Cursor entered button'); }}
            onMouseLeave={() => { setIsHovered(false); logEvent('onMouseLeave', 'Cursor left button'); }}
            className="btn btn-outline"
            style={{ backgroundColor: isHovered ? '#6366f1' : 'transparent', color: isHovered ? '#fff' : 'inherit' }}
          >
            {isHovered ? 'Hovered!' : 'Hover Over Me'}
          </button>
        </div>

        {/* Line 105: Form submission with e.preventDefault() */}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '8px', margin: '14px 0' }}>
          <input
            type="text"
            value={textInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type text & press Enter to test submit..."
            className="input-field"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">
            Submit (Prevent Reload)
          </button>
        </form>

        {/* Line 122: Event Log Display */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Live SyntheticEvent Stream:</strong>
            <button
              onClick={() => setEventLog([])}
              style={{ fontSize: '0.75rem', background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
            >
              Clear Log
            </button>
          </div>
          <div style={{
            background: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '6px',
            padding: '10px',
            marginTop: '6px',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            minHeight: '90px'
          }}>
            {eventLog.length === 0 ? (
              <span style={{ color: '#64748b' }}>No events recorded yet. Click a button or type above!</span>
            ) : (
              eventLog.map(item => (
                <div key={item.id} style={{ marginBottom: '4px' }}>
                  <span style={{ color: '#38bdf8' }}>[{item.time}]</span>{' '}
                  <span style={{ color: '#a78bfa', fontWeight: 'bold' }}>{item.name}:</span>{' '}
                  <span style={{ color: '#f1f5f9' }}>{item.details}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Line 162: Dashboard Metadata
EventsDemo.conceptInfo = {
  id: '05-events',
  title: '05. Event Handling',
  level: 'Beginner',
  file: 'src/concepts/05-Events/EventsDemo.jsx',
  summary: 'Understand SyntheticEvents, event naming in JSX, passing arguments, and preventing default browser behaviors.',
  keyTakeaways: [
    'Event names in React are camelCase (onClick, onSubmit, onChange).',
    'Pass function references, never function invocations (onClick={fn}, not onClick={fn()}).',
    'To pass arguments, wrap in an inline arrow function: onClick={() => fn(arg)}.',
    'Always use e.preventDefault() in form submit handlers to avoid page reloads.'
  ],
  challenge: 'Open src/concepts/05-Events/EventsDemo.jsx and add a `onDoubleClick` event handler to the card that alerts the user.'
};

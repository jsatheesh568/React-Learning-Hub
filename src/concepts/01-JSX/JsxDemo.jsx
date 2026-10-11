// Line 1: Import useState from 'react' to enable interactive demonstration.
import { useState } from 'react';

// Line 4: Pure constant defined outside component body.
const currentYear = new Date().getFullYear();

// Line 7: Define a functional component named JsxDemo (must start with a capital letter).
// Concept: React components MUST start with an uppercase letter to differentiate them from HTML tags.
export function JsxDemo() {
  // Line 11: State variable 'userName' holding the user's name for embedding into JSX expressions.
  const [userName, setUserName] = useState('Alex Developer');

  // Line 14: State variable 'isHighlight' holding boolean to demonstrate dynamic styles & classes.
  const [isHighlight, setIsHighlight] = useState(false);

  // Line 17: JavaScript object representing inline styles.
  // Concept: In React, inline styles are JavaScript objects with camelCase keys (e.g. backgroundColor).
  const dynamicCardStyle = {
    padding: '16px',
    borderRadius: '10px',
    border: isHighlight ? '2px solid #6366f1' : '1px solid #e2e8f0',
    backgroundColor: isHighlight ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
    transition: 'all 0.3s ease'
  };

  // Line 27: A helper function demonstrating that JSX can embed the result of function calls.
  function getGreeting(name) {
    return `Hello, ${name}! Welcome to React JSX.`;
  }

  // Line 32: Return statement returns JSX markup to be converted into Virtual DOM elements.
  // Concept: A component MUST return a single root element (or a Fragment <>...</>).
  return (
    <div className="demo-container">
      {/* Line 36: Title with JSX curly braces embedding a JavaScript expression */}
      <h3 className="demo-title">Module 01: JSX (JavaScript XML) & Expressions</h3>
      
      {/* Line 39: Description paragraph using className instead of HTML's 'class' */}
      {/* Concept: 'class' is a reserved keyword in JS, so React uses 'className' */}
      <p className="demo-description">
        JSX looks like HTML, but it compiles to JavaScript (React.createElement).
        Curly braces <code>{'{ }'}</code> let you drop pure JavaScript right into your markup!
      </p>

      {/* Line 46: Interactive Playground Box using inline style object */}
      <div style={dynamicCardStyle} className="interactive-box">
        {/* Line 48: Embedding function call result inside JSX */}
        <h4>{getGreeting(userName)}</h4>

        {/* Line 51: Embedding arithmetic calculation inside curly braces */}
        <p>
          Current year: <strong>{currentYear}</strong> | Next year: <strong>{currentYear + 1}</strong>
        </p>

        {/* Line 56: Controlled input allowing user to change the embedded name */}
        <div style={{ marginTop: '12px' }}>
          <label htmlFor="name-input" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>
            Type your name to see JSX re-evaluate:
          </label>
          <input
            id="name-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Type your name..."
            className="input-field"
          />
        </div>

        {/* Line 71: Button demonstrating dynamic className and inline style toggling */}
        <button
          onClick={() => setIsHighlight(prev => !prev)}
          className={`btn ${isHighlight ? 'btn-primary' : 'btn-outline'}`}
          style={{ marginTop: '12px' }}
        >
          {isHighlight ? 'Remove Highlight Style' : 'Apply Dynamic Style'}
        </button>
      </div>

      {/* Line 82: React Fragment example */}
      {/* Concept: React Fragments (<> ... </>) group elements without adding an extra <div> to the real DOM */}
      <>
        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Key JSX Rules to Remember:</strong>
          <ul>
            <li>Every tag must be closed, even self-closing ones like <code>&lt;input /&gt;</code> and <code>&lt;img /&gt;</code>.</li>
            <li>Use <code>className</code> instead of <code>class</code>, and <code>htmlFor</code> instead of <code>for</code>.</li>
            <li>Use camelCase for HTML attributes (e.g. <code>onClick</code>, <code>tabIndex</code>).</li>
            <li>Curly braces <code>{'{ }'}</code> can evaluate variables, math, ternary operators, and function calls.</li>
          </ul>
        </div>
      </>
    </div>
  );
}

// Line 101: Metadata for the learning dashboard
JsxDemo.conceptInfo = {
  id: '01-jsx',
  title: '01. JSX & Expressions',
  level: 'Beginner',
  file: 'src/concepts/01-JSX/JsxDemo.jsx',
  summary: 'Learn how React combines HTML with JavaScript syntax, how to embed dynamic expressions, and key JSX rules.',
  keyTakeaways: [
    'JSX allows writing HTML-like structure directly inside JavaScript code.',
    'Anything inside curly braces { ... } is evaluated as JavaScript expressions.',
    'Always use className instead of class, and close all tags explicitly.',
    'Fragments (<>...</>) let you group elements without adding extra DOM nodes.'
  ],
  challenge: 'Open src/concepts/01-JSX/JsxDemo.jsx and add a new JS variable `score = 100` and render `Double Score: {score * 2}`.'
};

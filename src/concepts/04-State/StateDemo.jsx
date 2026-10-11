// Line 1: Import useState hook from 'react'.
import { useState } from 'react';

// Line 4: MAIN EXPORTED COMPONENT: StateDemo
// Concept: State is a component's memory. When state updates, React re-renders the component to update the UI.
export function StateDemo() {
  // Line 8: 1. PRIMITIVE STATE: A simple numeric counter.
  // Concept: useState returns a 2-element array: [currentValue, setterFunction].
  const [count, setCount] = useState(0);

  // Line 12: A regular JavaScript variable to prove why regular variables fail to trigger UI updates.
  let _regularVariable = 0;

  // Line 15: 2. OBJECT STATE: Managing a user profile object.
  // Concept: In React, state must be treated as IMMUTABLE (never mutate state objects directly!).
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Connor',
    role: 'Cybersecurity Specialist',
    level: 1
  });

  // Line 24: 3. ARRAY STATE: Managing a list of tags.
  // Concept: Never use array.push() or array.splice() on React state; use array spreading [...prev, item] or filter.
  const [skills, setSkills] = useState(['React', 'JavaScript', 'CSS']);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Line 30: Demonstrates standard state increment.
  const handleSimpleIncrement = () => {
    // Line 32: Direct state setter triggers a re-render!
    setCount(count + 1);
  };

  // Line 36: Demonstrates that changing a regular variable does NOT notify React.
  const handleRegularVarClick = () => {
    _regularVariable++;
    alert(`Regular variable changed to ${_regularVariable}, but notice the UI did NOT re-render! React requires useState to trigger re-renders.`);
  };

  // Line 36: Demonstrates the functional updater pattern: setCount(prev => prev + 1).
  // Concept: When updating state multiple times or relying on latest state in async events, always use functional updater.
  const handleTripleIncrement = () => {
    // If we called setCount(count + 1) three times, count would only increase by 1 due to batching!
    // Using functional updates ensures each call reads the fresh value from the previous update:
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  // Line 47: Correct immutable object update using spread operator ({ ...prev }).
  const handleLevelUp = () => {
    setUserProfile(prev => ({
      ...prev,                  // Line 50: Copy all existing properties from prev
      level: prev.level + 1     // Line 51: Override only the 'level' property
    }));
  };

  // Line 55: Correct immutable array update using spread operator ([ ...prev, newItem ]).
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;

    // Line 60: Create a brand new array containing old items plus the new item
    setSkills(prev => [...prev, newSkillInput.trim()]);
    setNewSkillInput(''); // Clear the input field
  };

  // Line 65: Correct immutable array removal using .filter().
  const handleRemoveSkill = (skillToRemove) => {
    // Line 67: Filter returns a new array without mutating the original state array
    setSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  // Line 71: Return JSX markup
  return (
    <div className="demo-container">
      {/* Line 73: Section Title */}
      <h3 className="demo-title">Module 04: Component State (`useState` Hook)</h3>

      {/* Line 76: Overview */}
      <p className="demo-description">
        State represents dynamic data that changes over time. Unlike normal variables,
        updating state signals React to re-render the component and refresh the DOM.
      </p>

      {/* Line 82: SECTION 1: Counter & Functional Updates */}
      <div className="interactive-box" style={{ marginBottom: '16px' }}>
        <h4>1. Primitive State & The Functional Updater</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '14px 0' }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            padding: '8px 24px',
            borderRadius: '8px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            color: '#6366f1'
          }}>
            {count}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={handleSimpleIncrement} className="btn btn-primary">
              +1 Increment (useState)
            </button>
            <button onClick={handleRegularVarClick} className="btn btn-outline">
              Test Regular Variable (Fails)
            </button>
            <button onClick={handleTripleIncrement} className="btn btn-outline">
              +3 Increment (Functional)
            </button>
            <button onClick={() => setCount(0)} className="btn btn-outline">
              Reset
            </button>
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
          💡 Try clicking "+3": it runs <code>setCount(prev =&gt; prev + 1)</code> three times in sequence, successfully increasing by 3!
        </p>
      </div>

      {/* Line 114: SECTION 2: Object State (Immutability) */}
      <div className="interactive-box" style={{ marginBottom: '16px' }}>
        <h4>2. Object State & Immutability (Spread Operator)</h4>
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.04)',
          margin: '10px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <strong>{userProfile.name}</strong> — <em>{userProfile.role}</em>
            <div style={{ fontSize: '0.9rem', color: '#6366f1', marginTop: '4px' }}>
              Level: {userProfile.level}
            </div>
          </div>
          <button onClick={handleLevelUp} className="btn btn-primary">
            Level Up (+1)
          </button>
        </div>
        <pre style={{ margin: 0, padding: '8px', fontSize: '0.8rem', background: '#0f172a', color: '#38bdf8', borderRadius: '6px' }}>
          {JSON.stringify(userProfile, null, 2)}
        </pre>
      </div>

      {/* Line 141: SECTION 3: Array State */}
      <div className="interactive-box">
        <h4>3. Array State (Adding & Removing Items)</h4>
        <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '8px', margin: '12px 0' }}>
          <input
            type="text"
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            placeholder="Add new skill (e.g. Next.js)..."
            className="input-field"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">Add Skill</button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map(skill => (
            <span
              key={skill}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderRadius: '16px',
                fontSize: '0.85rem'
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ef4444',
                  fontWeight: 'bold'
                }}
                title="Remove skill"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Line 190: Crucial State Rules Box */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Golden Rules of React State:</strong>
        <ul>
          <li><strong>Never mutate state directly:</strong> Never write <code>userProfile.level = 2</code> or <code>skills.push('Node')</code>.</li>
          <li><strong>Always treat state as read-only:</strong> Produce new objects with <code>{'{ ...prev, prop: value }'}</code> and new arrays with <code>[...prev, item]</code>.</li>
          <li><strong>Asynchronous batching:</strong> React batches state updates for performance. To compute new state from previous state, pass a callback: <code>setCount(prev =&gt; prev + 1)</code>.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 205: Metadata
StateDemo.conceptInfo = {
  id: '04-state',
  title: '04. State (`useState`)',
  level: 'Beginner',
  file: 'src/concepts/04-State/StateDemo.jsx',
  summary: 'Master the useState hook, re-rendering triggers, functional updaters, and immutability with objects and arrays.',
  keyTakeaways: [
    'State is persistent component memory that triggers re-renders when updated.',
    'Direct mutations do not notify React; always use the setter function.',
    'Functional updates (prev => ...) protect against race conditions and batching.',
    'Always use spread operators (...prev) or immutability helpers for objects and arrays.'
  ],
  challenge: 'Open src/concepts/04-State/StateDemo.jsx and add a button to change `userProfile.role` to "Principal Architect".'
};

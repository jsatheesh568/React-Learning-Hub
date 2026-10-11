// Line 1: Import our two custom hooks created in src/hooks.
import { useToggle } from '../../hooks/useToggle';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Line 5: MAIN EXPORTED COMPONENT: CustomHooksDemo
// Concept: Custom hooks allow you to extract and reuse stateful logic without duplicating code.
export function CustomHooksDemo() {
  // Line 8: 1. USING THE 'useToggle' CUSTOM HOOK (Instance A)
  // Concept: Each component invocation of a custom hook receives isolated, independent state!
  const [isModalOpen, toggleModal] = useToggle(false);

  // Line 12: 1. USING THE 'useToggle' CUSTOM HOOK (Instance B - completely independent of Instance A!)
  const [isSecretVisible, toggleSecret] = useToggle(false);

  // Line 15: 2. USING THE 'useLocalStorage' CUSTOM HOOK
  // Concept: Manages a notes string state that automatically reads and syncs with browser localStorage.
  const [persistentNotes, setPersistentNotes] = useLocalStorage('react_lab_scratchpad', 'Type your personal learning notes here...');

  // Line 19: Return JSX
  return (
    <div className="demo-container">
      {/* Line 21: Title */}
      <h3 className="demo-title">Module 12: Custom Hooks (Reusable Logic)</h3>

      {/* Line 24: Overview */}
      <p className="demo-description">
        Custom Hooks are JavaScript functions whose names start with <code>use</code> and that can call other hooks.
        They allow you to package complex stateful logic (timers, storage, API queries) into reusable one-liners.
      </p>

      {/* Line 30: Section 1: useToggle Demo */}
      <div className="interactive-box" style={{ marginBottom: '16px' }}>
        <h4>1. Consuming <code>useToggle()</code> Hook</h4>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Notice how both toggles use the exact same hook definition, but maintain independent state:
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '12px 0' }}>
          <div>
            <button onClick={toggleModal} className="btn btn-primary">
              Toggle Notification Dialog: {isModalOpen ? 'OPEN' : 'CLOSED'}
            </button>
            {isModalOpen && (
              <div style={{
                marginTop: '8px',
                padding: '10px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid #6366f1',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}>
                🎉 Modal Dialog is Open! Controlled cleanly via <code>useToggle()</code>.
              </div>
            )}
          </div>

          <div>
            <button onClick={toggleSecret} className="btn btn-outline">
              {isSecretVisible ? 'Hide Secret Tip' : 'Show Secret Tip'}
            </button>
            {isSecretVisible && (
              <div style={{
                marginTop: '8px',
                padding: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10b981',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}>
                💡 Pro Tip: Custom hooks share stateful <em>logic</em>, not state itself!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Line 76: Section 2: useLocalStorage Demo */}
      <div className="interactive-box">
        <h4>2. Consuming <code>useLocalStorage()</code> Hook</h4>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Whatever you type below is automatically saved into <code>localStorage</code> under key <code>"react_lab_scratchpad"</code>.
          Try refreshing your browser tab — your notes will persist!
        </p>

        <textarea
          value={persistentNotes}
          onChange={(e) => setPersistentNotes(e.target.value)}
          rows={4}
          className="input-field"
          style={{ width: '100%', fontFamily: 'inherit', resize: 'vertical' }}
          placeholder="Type persistent study notes..."
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#10b981' }}>
            ✓ Auto-synchronized with browser storage
          </span>
          <button
            onClick={() => setPersistentNotes('')}
            className="btn btn-outline"
            style={{ fontSize: '0.75rem', padding: '4px 8px' }}
          >
            Clear Notes
          </button>
        </div>
      </div>

      {/* Line 108: Rules for Custom Hooks Box */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Custom Hooks Conventions & Rules:</strong>
        <ul>
          <li><strong>Must start with "use":</strong> React uses the <code>use</code> prefix to enforce the Rules of Hooks (e.g. no calling hooks inside loops or conditions).</li>
          <li><strong>Extracting duplication:</strong> Whenever you find yourself writing the same <code>useState</code> + <code>useEffect</code> combo in multiple components, extract it into a custom hook!</li>
          <li><strong>Return anything:</strong> A custom hook can return arrays, objects, booleans, or nothing at all, depending on what makes the cleanest API.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 122: Metadata
CustomHooksDemo.conceptInfo = {
  id: '12-customhooks',
  title: '12. Custom Hooks',
  level: 'Intermediate',
  file: 'src/concepts/12-CustomHooks/CustomHooksDemo.jsx',
  summary: 'Learn how to extract reusable stateful logic into custom hooks like useLocalStorage and useToggle.',
  keyTakeaways: [
    'Custom hooks must start with "use" to follow React hook conventions.',
    'They allow you to package stateful logic into reusable functions.',
    'Each component calling a custom hook gets its own isolated state.',
    'They keep component files clean, focused, and declarative.'
  ],
  challenge: 'Open src/hooks/ and create a new `useWindowSize()` hook that listens to window resize events.'
};

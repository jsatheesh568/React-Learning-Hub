// Line 1: Import useState and useEffect hooks from 'react'.
import { useState, useEffect } from 'react';

// Line 4: SUB-COMPONENT: LiveTimer demonstrating effect setup and cleanup functions.
// Concept: When a component unmounts, intervals or subscriptions must be cleaned up to avoid memory leaks!
function LiveTimer() {
  // Line 7: State for seconds elapsed.
  const [seconds, setSeconds] = useState(0);

  // Line 10: useEffect with empty dependency array [] + cleanup function.
  useEffect(() => {
    // Line 12: SETUP PHASE: Start setInterval timer when component mounts.
    console.log('[LiveTimer] Mounted. Starting interval timer...');
    const intervalId = setInterval(() => {
      // Line 15: Functional state update to avoid stale closure over 'seconds'.
      setSeconds(prev => prev + 1);
    }, 1000);

    // Line 19: CLEANUP PHASE: Returned function runs before re-running effect or when component unmounts.
    return () => {
      console.log('[LiveTimer] Unmounted. Clearing interval timer...');
      clearInterval(intervalId); // Line 22: Stops timer and prevents memory leaks!
    };
  }, []); // Line 24: [] means this effect runs ONLY once on Mount, and cleans up on Unmount.

  return (
    <div style={{
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: 'rgba(99, 102, 241, 0.12)',
      border: '1px solid #6366f1',
      display: 'inline-block'
    }}>
      ⏱️ Timer running: <strong>{seconds}s</strong> (Check browser console for Mount/Unmount logs)
    </div>
  );
}

// Line 39: MAIN EXPORTED COMPONENT: UseEffectDemo
export function UseEffectDemo() {
  // Line 41: State to mount/unmount the LiveTimer to see cleanup in action.
  const [showTimer, setShowTimer] = useState(true);

  // Line 44: State for simulated API data fetching.
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [userData, setUserData] = useState({
    name: 'Ada Lovelace',
    role: 'First Computer Programmer',
    bio: 'Pioneer of algorithms.'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Line 51: Handler for selecting a new user.
  const handleSelectUser = (id) => {
    if (id !== selectedUserId) {
      setSelectedUserId(id);
      setIsLoading(true);
      setUserData(null);
    }
  };

  // Line 60: useEffect demonstrating dependency array [selectedUserId].
  // Concept: Whenever 'selectedUserId' changes, this effect automatically triggers!
  useEffect(() => {
    // Line 63: Flag to prevent race conditions if user changes ID before fetch resolves.
    let isCancelled = false;

    // Line 66: Simulate asynchronous API network request with setTimeout.
    const timeoutId = setTimeout(() => {
      if (!isCancelled) {
        // Mocked response data based on selected ID
        const mockDatabase = {
          1: { name: 'Ada Lovelace', role: 'First Computer Programmer', bio: 'Pioneer of algorithms.' },
          2: { name: 'Alan Turing', role: 'Father of Theoretical CS', bio: 'Cracked the Enigma code.' },
          3: { name: 'Grace Hopper', role: 'Inventor of First Compiler', bio: 'Popularized machine-independent languages.' }
        };
        setUserData(mockDatabase[selectedUserId]);
        setIsLoading(false);
      }
    }, 800);

    // Line 80: Cleanup function to cancel stale responses if selectedUserId changes quickly.
    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [selectedUserId]); // Line 85: Effect re-runs ONLY when selectedUserId changes!

  // Line 80: Return JSX
  return (
    <div className="demo-container">
      {/* Line 82: Title */}
      <h3 className="demo-title">Module 08: Side Effects (`useEffect` Hook)</h3>

      {/* Line 85: Overview */}
      <p className="demo-description">
        Side effects are operations that reach outside the React rendering flow:
        network requests, timer intervals, direct DOM updates, or event subscriptions.
      </p>

      {/* Line 91: Section 1: Timer & Cleanup */}
      <div className="interactive-box" style={{ marginBottom: '16px' }}>
        <h4>1. Mount, Unmount, and Cleanup Functions</h4>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Mount and unmount the timer component below to see the cleanup function in action.
        </p>

        <div style={{ marginBottom: '12px' }}>
          <button
            onClick={() => setShowTimer(prev => !prev)}
            className={`btn ${showTimer ? 'btn-outline' : 'btn-primary'}`}
          >
            {showTimer ? 'Unmount Timer (Trigger Cleanup)' : 'Mount Timer'}
          </button>
        </div>

        {/* Line 106: Conditionally render LiveTimer component */}
        {showTimer ? <LiveTimer /> : <p style={{ color: '#ef4444', fontStyle: 'italic' }}>Timer unmounted! Interval was safely cleared.</p>}
      </div>

      {/* Line 110: Section 2: Data Fetching with Dependencies */}
      <div className="interactive-box">
        <h4>2. Data Fetching & Dependency Array [selectedUserId]</h4>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Select a user below. The <code>useEffect</code> listens to changes in <code>[selectedUserId]</code> and automatically executes a fetch.
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          {[1, 2, 3].map(id => (
            <button
              key={id}
              onClick={() => handleSelectUser(id)}
              className={`btn ${selectedUserId === id ? 'btn-primary' : 'btn-outline'}`}
            >
              Fetch User #{id}
            </button>
          ))}
        </div>

        {/* Line 129: Data rendering */}
        <div style={{
          minHeight: '80px',
          padding: '14px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '8px',
          border: '1px solid #334155'
        }}>
          {isLoading && <span style={{ color: '#6366f1' }}>⏳ Fetching data for User #{selectedUserId}...</span>}
          {userData && (
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#38bdf8' }}>{userData.name}</h4>
              <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 600 }}>{userData.role}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>{userData.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Line 148: Dependency Array Reference Card */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>The 3 Dependency Array Rules:</strong>
        <ul>
          <li><code>useEffect(fn)</code> (No array): Runs on <strong>every single render</strong>. Usually causes performance issues or infinite loops!</li>
          <li><code>useEffect(fn, [])</code> (Empty array): Runs <strong>only once when mounted</strong>, cleans up on unmount.</li>
          <li><code>useEffect(fn, [a, b])</code> (With dependencies): Runs on mount and <strong>whenever a or b change</strong>.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 162: Metadata
UseEffectDemo.conceptInfo = {
  id: '08-useeffect',
  title: '08. Side Effects (`useEffect`)',
  level: 'Intermediate',
  file: 'src/concepts/08-UseEffect/UseEffectDemo.jsx',
  summary: 'Understand the lifecycle of side effects, dependency array rules, and cleanup functions for timers & subscriptions.',
  keyTakeaways: [
    'useEffect synchronizes your component with external systems (APIs, timers, DOM).',
    'The dependency array controls exactly when the effect re-runs.',
    'Always return a cleanup function when establishing timers, listeners, or subscriptions.',
    'Missing dependencies can lead to stale closures and buggy state.'
  ],
  challenge: 'Open src/concepts/08-UseEffect/UseEffectDemo.jsx and add document title synchronization (`document.title = userData.name`).'
};

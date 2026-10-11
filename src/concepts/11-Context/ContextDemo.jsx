// Line 1: Import useContext, createContext, and useState from 'react'.
import { useContext, createContext, useState } from 'react';

// Line 4: 1. CREATE CONTEXT
// Concept: createContext creates a Context object.
const UserAccountContext = createContext(null);

// Line 8: LEVEL 3 COMPONENT (Deeply nested child)
// Concept: Level 3 directly consumes UserAccountContext using useContext() WITHOUT Level 2 having to pass it!
function DeepChildConsumer() {
  // Line 11: Consume the context value directly.
  const { user, updateUserStatus } = useContext(UserAccountContext);

  return (
    <div style={{
      border: '2px dashed #10b981',
      padding: '14px',
      borderRadius: '8px',
      backgroundColor: 'rgba(16, 185, 129, 0.05)',
      marginTop: '10px'
    }}>
      <h5 style={{ margin: '0 0 6px 0', color: '#10b981' }}>
        Level 3: Deep Nested Child (Consumes Context with <code>useContext()</code>)
      </h5>
      <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>
        Logged in as: <strong>{user.username}</strong> | Status: <strong>{user.status}</strong>
      </p>
      <button
        onClick={() => updateUserStatus(user.status === 'Active' ? 'Busy' : 'Active')}
        className="btn btn-outline"
        style={{ fontSize: '0.8rem', padding: '4px 10px' }}
      >
        Toggle Status from Deep Child
      </button>
    </div>
  );
}

// Line 36: LEVEL 2 COMPONENT (Intermediate component)
// Concept: Notice that Level 2 receives ZERO props related to user. It does not need to participate in prop drilling!
function IntermediateWrapper() {
  return (
    <div style={{
      border: '1px solid #64748b',
      padding: '14px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      marginTop: '10px'
    }}>
      <h5 style={{ margin: '0 0 6px 0', color: '#94a3b8' }}>
        Level 2: Intermediate Component (Zero Prop Drilling!)
      </h5>
      <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#64748b' }}>
        This component doesn't care about the user data. It simply renders children without passing props through.
      </p>
      {/* Line 53: Rendering deep child */}
      <DeepChildConsumer />
    </div>
  );
}

// Line 58: MAIN EXPORTED COMPONENT: ContextDemo (Level 1 Parent & Provider)
export function ContextDemo() {
  // Line 60: Parent state managed at the top of this tree
  const [user, setUser] = useState({
    username: 'DevMaster_42',
    status: 'Active',
    plan: 'Pro Member'
  });

  // Line 67: Function to update user status
  const updateUserStatus = (newStatus) => {
    setUser(prev => ({ ...prev, status: newStatus }));
  };

  // Line 72: Bundle data and functions to pass down through Provider
  const contextValue = {
    user,
    updateUserStatus
  };

  // Line 78: Return JSX
  return (
    <div className="demo-container">
      {/* Line 80: Title */}
      <h3 className="demo-title">Module 11: Context API (`useContext` Hook)</h3>

      {/* Line 83: Overview */}
      <p className="demo-description">
        Context provides a way to pass data through the component tree without having to
        manually pass props down through every level (solving "Prop Drilling").
      </p>

      {/* Line 89: Interactive Tree Demo */}
      <div className="interactive-box">
        <h4>Interactive 3-Tier Component Tree:</h4>

        {/* Line 93: LEVEL 1 PROVIDER WRAPPER */}
        {/* Concept: Any descendant inside <UserAccountContext.Provider> can access the value prop */}
        <UserAccountContext.Provider value={contextValue}>
          <div style={{
            border: '2px solid #6366f1',
            padding: '16px',
            borderRadius: '10px',
            backgroundColor: 'rgba(99, 102, 241, 0.05)'
          }}>
            <h5 style={{ margin: '0 0 8px 0', color: '#6366f1' }}>
              Level 1: Root Provider (Holds State & Provides <code>value</code>)
            </h5>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="input-field"
                style={{ width: '220px' }}
                placeholder="Change username..."
              />
              <span style={{ fontSize: '0.85rem' }}>
                Status: <strong>{user.status}</strong>
              </span>
            </div>

            {/* Line 120: Render Intermediate component */}
            <IntermediateWrapper />
          </div>
        </UserAccountContext.Provider>
      </div>

      {/* Line 126: Context Comparison Box */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>When to Use Props vs Context:</strong>
        <ul>
          <li><strong>Use Props:</strong> For passing data to direct children or 1-2 levels down. Props make data flow explicit and components easy to test.</li>
          <li><strong>Use Context:</strong> For truly global state: UI Themes (dark/light), authenticated user details, language/localization, or shopping carts.</li>
          <li><strong>Caution:</strong> Don't use Context for everything. Components hooked directly to Context are harder to reuse in isolation.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 141: Metadata
ContextDemo.conceptInfo = {
  id: '11-context',
  title: '11. Context API (`useContext`)',
  level: 'Intermediate',
  file: 'src/concepts/11-Context/ContextDemo.jsx',
  summary: 'Solve prop drilling by creating and consuming React Context across deeply nested component trees.',
  keyTakeaways: [
    'createContext() defines the shared data contract.',
    '<Context.Provider value={...}> broadcasts data to all descendants.',
    'useContext(Context) reads the broadcasted value directly from any nested component.',
    'Eliminates intermediate components having to forward unwanted props.'
  ],
  challenge: 'Open src/concepts/11-Context/ContextDemo.jsx and add a `plan` field to context with a button in Level 3 to upgrade to "Enterprise".'
};

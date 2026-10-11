// Line 1: Import useState from 'react' to drive the conditional states.
import { useState } from 'react';

// Line 4: MAIN EXPORTED COMPONENT: ConditionalDemo
// Concept: Conditional rendering lets you show or hide UI elements based on state or condition checks.
export function ConditionalDemo() {
  // Line 7: State for user authentication status: 'guest' | 'loading' | 'authenticated'
  const [authStatus, setAuthStatus] = useState('guest');
  // Line 9: State for notifications count (demonstrates the famous 0 && <Component /> trap)
  const [unreadCount, setUnreadCount] = useState(0);
  // Line 11: Boolean flag for premium subscription badge
  const [isPremium, setIsPremium] = useState(false);

  // Line 14: Pattern 1: Early Return pattern inside a sub-render function.
  // Concept: If a condition requires completely different output (like a loading state), return early!
  const renderAuthSection = () => {
    // Early return for loading
    if (authStatus === 'loading') {
      return (
        <div style={{ padding: '16px', textAlign: 'center', color: '#6366f1' }}>
          ⏳ Authenticating user session, please wait...
        </div>
      );
    }

    // Early return for guest
    if (authStatus === 'guest') {
      return (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 8px 0', color: '#ef4444' }}>You are currently browsing as a <strong>Guest</strong>.</p>
          <button
            onClick={() => {
              setAuthStatus('loading');
              setTimeout(() => setAuthStatus('authenticated'), 1000);
            }}
            className="btn btn-primary"
          >
            Log In (Simulate 1s loading)
          </button>
        </div>
      );
    }

    // Return for authenticated user
    return (
      <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 8px 0', color: '#10b981' }}>
          Welcome back, <strong>Developer Alex</strong>!
          {/* Line 47: Inline Ternary for premium badge */}
          {isPremium ? (
            <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#f59e0b', color: '#fff', borderRadius: '12px', fontSize: '0.75rem' }}>
              ⭐ VIP PRO
            </span>
          ) : (
            <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#94a3b8', color: '#fff', borderRadius: '12px', fontSize: '0.75rem' }}>
              Free Tier
            </span>
          )}
        </p>
        <button onClick={() => setAuthStatus('guest')} className="btn btn-outline">
          Log Out
        </button>
      </div>
    );
  };

  // Line 65: Return JSX
  return (
    <div className="demo-container">
      {/* Line 67: Title */}
      <h3 className="demo-title">Module 06: Conditional Rendering</h3>

      {/* Line 70: Description */}
      <p className="demo-description">
        In React, there are no special <code>v-if</code> or <code>*ngIf</code> directives.
        You use standard JavaScript constructs: <code>if/else</code>, ternary <code>? :</code>, and logical <code>&&</code>.
      </p>

      {/* Line 76: Interactive Section */}
      <div className="interactive-box">
        <h4>1. Early Return & Status State Pattern</h4>
        {/* Line 79: Invoking our conditional render function */}
        {renderAuthSection()}
      </div>

      {/* Line 83: Pattern 2: The Logical AND (&&) Operator and the famous '0' Trap */}
      <div className="interactive-box" style={{ marginTop: '16px' }}>
        <h4>2. Logical AND (&&) & The "Zero Bug" Trap</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '10px 0' }}>
          <span>Unread Notification Count: <strong>{unreadCount}</strong></span>
          <button onClick={() => setUnreadCount(prev => prev + 1)} className="btn btn-outline" style={{ padding: '4px 10px' }}>+1</button>
          <button onClick={() => setUnreadCount(prev => Math.max(0, prev - 1))} className="btn btn-outline" style={{ padding: '4px 10px' }}>-1</button>
          <button onClick={() => setUnreadCount(0)} className="btn btn-outline" style={{ padding: '4px 10px' }}>Reset to 0</button>
        </div>

        {/* Line 94: Safe Logical AND Rendering */}
        {/* Concept: In JS, `0 && <JSX/>` evaluates to 0, which prints "0" on screen! Always check unreadCount > 0! */}
        <div style={{ marginTop: '8px' }}>
          <strong>Safe Condition: <code>unreadCount &gt; 0 && &lt;Badge /&gt;</code>:</strong>
          <div style={{ marginTop: '4px' }}>
            {unreadCount > 0 && (
              <span style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 }}>
                📬 You have {unreadCount} new notifications!
              </span>
            )}
            {unreadCount === 0 && (
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>No new notifications. All caught up!</span>
            )}
          </div>
        </div>
      </div>

      {/* Line 112: Pattern 3: Ternary Toggle */}
      <div className="interactive-box" style={{ marginTop: '16px' }}>
        <h4>3. Ternary Operator (condition ? A : B)</h4>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          Toggle Premium Subscription Status
        </label>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem' }}>
          Status: {isPremium ? '🚀 You have access to all 50+ master projects!' : '🔒 Standard library only. Upgrade to unlock all.'}
        </p>
      </div>

      {/* Line 128: Summary Card */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Conditional Rendering Best Practices:</strong>
        <ul>
          <li>Use <strong>Ternary (condition ? A : B)</strong> when choosing between two mutually exclusive views.</li>
          <li>Use <strong>Logical AND (condition && A)</strong> when rendering something or nothing.</li>
          <li><strong>Trap Alert:</strong> Never do <code>array.length && &lt;List /&gt;</code>! If length is 0, React renders the number 0! Always write <code>array.length &gt; 0 && ...</code>.</li>
          <li>To completely suppress rendering from a component, return <code>null</code>.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 142: Metadata
ConditionalDemo.conceptInfo = {
  id: '06-conditional',
  title: '06. Conditional Rendering',
  level: 'Beginner',
  file: 'src/concepts/06-ConditionalRendering/ConditionalDemo.jsx',
  summary: 'Explore if/else, ternary operators, short-circuit logical AND, early returns, and how to avoid the "0" trap.',
  keyTakeaways: [
    'React uses standard JavaScript conditionals, not special templating syntax.',
    'Ternary operators (? :) are perfect for if/else binary UI choices.',
    'The logical AND (&&) operator is great for conditional inclusion.',
    'Always use boolean conditions (count > 0) with && to avoid printing 0 to the DOM.'
  ],
  challenge: 'Open src/concepts/06-ConditionalRendering/ConditionalDemo.jsx and add a "Maintenance Mode" banner that overrides everything when active.'
};

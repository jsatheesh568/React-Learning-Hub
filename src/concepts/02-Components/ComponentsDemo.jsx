// Line 1: Import useState from 'react' to make this demo interactive.
import { useState } from 'react';

// Line 4: SUB-COMPONENT 1: A reusable Badge component.
// Concept: Small components can be composed together like Lego bricks to build complex UIs.
function RoleBadge({ role }) {
  // Line 7: Determine badge color dynamically based on role string.
  const badgeColor = role === 'Admin' ? '#ef4444' : role === 'Editor' ? '#3b82f6' : '#10b981';

  // Line 10: Return a styled span element.
  return (
    <span style={{
      backgroundColor: `${badgeColor}20`,
      color: badgeColor,
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 600
    }}>
      {role}
    </span>
  );
}

// Line 25: SUB-COMPONENT 2: An Avatar component.
// Concept: Components can accept properties (props) and render specific UI accordingly.
function Avatar({ initial, color = '#6366f1' }) {
  // Line 28: Return circular initial avatar.
  return (
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: color,
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    }}>
      {initial}
    </div>
  );
}

// Line 47: SUB-COMPONENT 3: UserCard component composing Avatar and RoleBadge.
// Concept: Component Composition — nesting components inside one another to create rich layouts.
function UserProfileCard({ name, role, email, status }) {
  // Line 50: Return a composed card structure.
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'rgba(255, 255, 255, 0.05)',
      marginBottom: '8px'
    }}>
      {/* Line 62: Reusable sub-component 1 */}
      <Avatar initial={name.charAt(0)} />

      {/* Line 65: Middle info section */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong>{name}</strong>
          {/* Line 69: Reusable sub-component 2 */}
          <RoleBadge role={role} />
        </div>
        <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>{email}</p>
      </div>

      {/* Line 75: Status indicator dot */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8rem',
        color: status === 'Online' ? '#10b981' : '#94a3b8'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: status === 'Online' ? '#10b981' : '#94a3b8'
        }} />
        {status}
      </div>
    </div>
  );
}

// Line 95: MAIN EXPORTED COMPONENT: ComponentsDemo
// Concept: Root component for this lesson demonstrating how multiple small components work together.
export function ComponentsDemo() {
  // Line 98: State holding list of users to demonstrate component reusability with multiple instances.
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Walker', role: 'Admin', email: 'alice@example.com', status: 'Online' },
    { id: 2, name: 'Bob Smith', role: 'Editor', email: 'bob@example.com', status: 'Offline' },
    { id: 3, name: 'Charlie Kim', role: 'Viewer', email: 'charlie@example.com', status: 'Online' }
  ]);

  // Line 106: Function to add another user component to prove dynamic reuse.
  const handleAddUser = () => {
    const roles = ['Admin', 'Editor', 'Viewer'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const newId = users.length + 1;
    const newUser = {
      id: newId,
      name: `User ${newId}`,
      role: randomRole,
      email: `user${newId}@example.com`,
      status: Math.random() > 0.5 ? 'Online' : 'Offline'
    };
    // Line 118: Update state with new array including the new user
    setUsers([...users, newUser]);
  };

  // Line 122: Main return statement of the component
  return (
    <div className="demo-container">
      {/* Line 124: Title */}
      <h3 className="demo-title">Module 02: Functional Components & Composition</h3>

      {/* Line 127: Educational summary */}
      <p className="demo-description">
        React components are regular JavaScript functions that return JSX.
        You break down user interfaces into small, independent, and reusable pieces.
      </p>

      {/* Line 133: Action button to test reusable component rendering */}
      <div style={{ marginBottom: '14px' }}>
        <button onClick={handleAddUser} className="btn btn-primary">
          + Add New User Component Instance
        </button>
      </div>

      {/* Line 140: Rendering multiple instances of UserProfileCard */}
      {/* Concept: Reusability — the same component renders different data effortlessly */}
      <div className="interactive-box">
        <h4>User Component Tree ({users.length} Instances):</h4>
        {users.map(user => (
          <UserProfileCard
            key={user.id}
            name={user.name}
            role={user.role}
            email={user.email}
            status={user.status}
          />
        ))}
      </div>

      {/* Line 156: Component Architecture breakdown card */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Component Anatomy Rules:</strong>
        <ul>
          <li><strong>PascalCase:</strong> Always name components with a capital letter (e.g. <code>UserProfileCard</code>).</li>
          <li><strong>Pure Functions:</strong> A component should be predictable — same props in, same JSX out.</li>
          <li><strong>Composition over Inheritance:</strong> React builds complex UIs by composing small components inside parent components.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 171: Metadata for dashboard
ComponentsDemo.conceptInfo = {
  id: '02-components',
  title: '02. Functional Components',
  level: 'Beginner',
  file: 'src/concepts/02-Components/ComponentsDemo.jsx',
  summary: 'Discover how React apps are constructed from functional components, sub-components, and composition.',
  keyTakeaways: [
    'Components are JavaScript functions that return JSX markup.',
    'Component names must start with a capital letter (PascalCase).',
    'Complex UIs are built by composing simple, single-purpose components together.',
    'Components can be reused multiple times across an application with different inputs.'
  ],
  challenge: 'Open src/concepts/02-Components/ComponentsDemo.jsx and create a new `<DepartmentBadge />` component to show inside `<UserProfileCard />`.'
};

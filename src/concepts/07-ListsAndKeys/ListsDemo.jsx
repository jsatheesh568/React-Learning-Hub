// Line 1: Import useState from 'react' to manage list state.
import { useState } from 'react';

// Line 4: MAIN EXPORTED COMPONENT: ListsDemo
// Concept: React renders collections of data using JavaScript's array .map() method with unique keys.
export function ListsDemo() {
  // Line 7: Initial dataset with persistent unique IDs
  const initialTasks = [
    { id: 'task-101', title: 'Learn JSX Syntax', done: true },
    { id: 'task-102', title: 'Understand State & Props', done: true },
    { id: 'task-103', title: 'Master Keys in Lists', done: false }
  ];

  // Line 14: State managing the task list
  const [tasks, setTasks] = useState(initialTasks);
  // Line 16: Filter state: 'all' | 'completed' | 'pending'
  const [filter, setFilter] = useState('all');

  // Line 19: Function demonstrating list prepending (adding to top)
  // Concept: Prepending reveals why using array index as key breaks input state!
  const handlePrependTask = () => {
    const newId = `task-${Date.now()}`;
    const newTask = {
      id: newId,
      title: `⚡ New Urgent Task (${new Date().toLocaleTimeString()})`,
      done: false
    };
    // Line 28: Spread operator adds new task at index 0
    setTasks([newTask, ...tasks]);
  };

  // Line 32: Function demonstrating task deletion by unique ID
  const handleDeleteTask = (idToDelete) => {
    // Line 34: .filter() creates a new array excluding the target task
    setTasks(tasks.filter(task => task.id !== idToDelete));
  };

  // Line 38: Function demonstrating task completion toggle
  const handleToggleDone = (idToToggle) => {
    // Line 40: .map() returns a new array with the target item's 'done' flipped
    setTasks(tasks.map(task => {
      if (task.id === idToToggle) {
        return { ...task, done: !task.done };
      }
      return task;
    }));
  };

  // Line 49: Filtered array derivation
  // Concept: Derived state should be computed directly during render, not stored in a separate state!
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.done;
    if (filter === 'pending') return !task.done;
    return true; // 'all'
  });

  // Line 57: Return JSX
  return (
    <div className="demo-container">
      {/* Line 59: Title */}
      <h3 className="demo-title">Module 07: Lists & The `key` Prop</h3>

      {/* Line 62: Description */}
      <p className="demo-description">
        In React, we transform arrays of data into lists of JSX elements using <code>array.map()</code>.
        Each item requires a unique, stable <code>key</code> prop so React can identify which items changed, were added, or were removed.
      </p>

      {/* Line 68: Controls Bar */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
        <button onClick={handlePrependTask} className="btn btn-primary">
          + Prepend Item to Start
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-outline'}`}
              style={{ textTransform: 'capitalize', padding: '4px 10px', fontSize: '0.8rem' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Line 88: Interactive List */}
      <div className="interactive-box">
        <h4>Task List ({filteredTasks.length} items rendered via .map()):</h4>
        
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#64748b' }}>No tasks found for filter "{filter}".</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0' }}>
            {/* Line 96: Array .map() generating JSX elements with unique keys */}
            {filteredTasks.map((task) => (
              <li
                key={task.id} // Line 99: UNIQUE KEY PROP (Crucial for React Virtual DOM reconciliation!)
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  marginBottom: '8px',
                  border: '1px solid #334155'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleDone(task.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{
                    textDecoration: task.done ? 'line-through' : 'none',
                    color: task.done ? '#64748b' : 'inherit'
                  }}>
                    {task.title}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    key: {task.id}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                  title="Delete Task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Line 151: Why Index as Key is Bad Box */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Why You Should NEVER Use Array Index as Key:</strong>
        <ul>
          <li><strong>Keys identify DOM nodes across renders:</strong> If you use <code>key={'{index}'}</code> and prepend an item to the top, the new item gets index 0, and all existing items shift indices.</li>
          <li><strong>Causes bugs with form inputs & animations:</strong> Component state (like typed text in input fields) gets associated with the index, causing values to jump to the wrong items!</li>
          <li><strong>Best Practice:</strong> Always use unique database IDs or generate stable UUIDs (e.g. <code>crypto.randomUUID()</code>) when creating items.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 166: Metadata
ListsDemo.conceptInfo = {
  id: '07-lists',
  title: '07. Lists & Keys',
  level: 'Beginner',
  file: 'src/concepts/07-ListsAndKeys/ListsDemo.jsx',
  summary: 'Understand how to render collections with array.map(), the purpose of the key prop, and pitfalls of index keys.',
  keyTakeaways: [
    'Use array.map() to transform data arrays into lists of JSX elements.',
    'Every top-level element returned by map() MUST have a unique "key" prop.',
    'Keys tell React which items have been added, removed, or reordered.',
    'Never use array indices as keys if items can be reordered, sorted, or filtered.'
  ],
  challenge: 'Open src/concepts/07-ListsAndKeys/ListsDemo.jsx and add a "Sort Alphabetically" button that sorts tasks by title.'
};

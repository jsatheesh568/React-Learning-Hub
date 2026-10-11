// Line 1: Import all 12 concept demo components.
import { JsxDemo } from '../concepts/01-JSX/JsxDemo';
import { ComponentsDemo } from '../concepts/02-Components/ComponentsDemo';
import { PropsDemo } from '../concepts/03-Props/PropsDemo';
import { StateDemo } from '../concepts/04-State/StateDemo';
import { EventsDemo } from '../concepts/05-Events/EventsDemo';
import { ConditionalDemo } from '../concepts/06-ConditionalRendering/ConditionalDemo';
import { ListsDemo } from '../concepts/07-ListsAndKeys/ListsDemo';
import { UseEffectDemo } from '../concepts/08-UseEffect/UseEffectDemo';
import { FormsDemo } from '../concepts/09-Forms/FormsDemo';
import { UseRefDemo } from '../concepts/10-UseRef/UseRefDemo';
import { ContextDemo } from '../concepts/11-Context/ContextDemo';
import { CustomHooksDemo } from '../concepts/12-CustomHooks/CustomHooksDemo';

// Export ordered array of all 12 core concepts
export const CONCEPTS_LIST = [
  {
    ...JsxDemo.conceptInfo,
    Component: JsxDemo,
    category: 'Fundamentals',
    codeSnippet: `// 1. JSX compiles to React.createElement
// 2. Curly braces evaluate JS expressions:
const name = "Alex";
const element = <h1>Hello, {name}!</h1>;

// 3. Inline style takes an object:
<div style={{ color: '#6366f1', padding: '10px' }}>
  Current year is: {new Date().getFullYear()}
</div>

// 4. React Fragment groups elements without extra DOM wrapper:
<>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</>`
  },
  {
    ...ComponentsDemo.conceptInfo,
    Component: ComponentsDemo,
    category: 'Fundamentals',
    codeSnippet: `// 1. Functional component: JavaScript function returning JSX
function RoleBadge({ role }) {
  return <span className="badge">{role}</span>;
}

// 2. Component Composition: nesting smaller components inside
function UserProfileCard({ name, role }) {
  return (
    <div className="card">
      <strong>{name}</strong>
      <RoleBadge role={role} />
    </div>
  );
}`
  },
  {
    ...PropsDemo.conceptInfo,
    Component: PropsDemo,
    category: 'Fundamentals',
    codeSnippet: `// 1. Destructuring props with default values
function ProductCard({ title, price, discount = 0, onAddToCart, children }) {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>Price: \${price} (Discount: {discount}%)</p>
      {/* Special children prop */}
      <div>{children}</div>
      {/* Callback prop */}
      <button onClick={() => onAddToCart(title)}>Add to Cart</button>
    </div>
  );
}`
  },
  {
    ...StateDemo.conceptInfo,
    Component: StateDemo,
    category: 'Core Hooks',
    codeSnippet: `// 1. Primitive state with useState
const [count, setCount] = useState(0);

// Functional updater avoids batching traps:
setCount(prev => prev + 1);

// 2. Object state: IMMUTABILITY with spread operator
const [user, setUser] = useState({ name: 'Alex', level: 1 });
setUser(prev => ({ ...prev, level: prev.level + 1 }));

// 3. Array state: append with spread, delete with filter
const [items, setItems] = useState(['A', 'B']);
setItems(prev => [...prev, 'C']); // add
setItems(prev => prev.filter(i => i !== 'B')); // remove`
  },
  {
    ...EventsDemo.conceptInfo,
    Component: EventsDemo,
    category: 'Core Hooks',
    codeSnippet: `// 1. Event handler with SyntheticEvent
const handleClick = (e) => {
  console.log('Coordinates:', e.clientX, e.clientY);
};

// 2. Passing custom parameters with arrow function
<button onClick={() => handleDelete(item.id)}>Delete</button>

// 3. Form submit with e.preventDefault()
const handleSubmit = (e) => {
  e.preventDefault(); // Prevents full page reload
  console.log('Form handled!');
};`
  },
  {
    ...ConditionalDemo.conceptInfo,
    Component: ConditionalDemo,
    category: 'Patterns',
    codeSnippet: `// 1. Ternary Operator:
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// 2. Logical AND (&&):
// Tip: Ensure condition is boolean (count > 0) to avoid rendering 0!
{unreadCount > 0 && <span className="badge">{unreadCount}</span>}

// 3. Early Return:
if (isLoading) {
  return <LoadingSpinner />;
}
return <MainContent />;`
  },
  {
    ...ListsDemo.conceptInfo,
    Component: ListsDemo,
    category: 'Patterns',
    codeSnippet: `// Rendering lists with array.map() and UNIQUE KEYS
const tasks = [
  { id: 't1', text: 'Learn React' },
  { id: 't2', text: 'Build Projects' }
];

return (
  <ul>
    {tasks.map(task => (
      // Always use a unique stable ID for key, NOT the array index!
      <li key={task.id}>
        {task.text}
      </li>
    ))}
  </ul>
);`
  },
  {
    ...UseEffectDemo.conceptInfo,
    Component: UseEffectDemo,
    category: 'Core Hooks',
    codeSnippet: `// 1. Run once on mount & cleanup on unmount
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer); // Cleanup function!
}, []);

// 2. Run whenever dependency changes
useEffect(() => {
  fetchData(userId);
}, [userId]); // Only re-runs when userId changes`
  },
  {
    ...FormsDemo.conceptInfo,
    Component: FormsDemo,
    category: 'Patterns',
    codeSnippet: `// Multi-input controlled form using single state object
const [formData, setFormData] = useState({ username: '', email: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value // Computed property name
  }));
};

<input name="username" value={formData.username} onChange={handleChange} />
<input name="email" value={formData.email} onChange={handleChange} />`
  },
  {
    ...UseRefDemo.conceptInfo,
    Component: UseRefDemo,
    category: 'Advanced Hooks',
    codeSnippet: `// 1. Direct DOM Access (focusing)
const inputRef = useRef(null);
const focusInput = () => {
  inputRef.current.focus();
};
<input ref={inputRef} />

// 2. Mutable value that DOES NOT trigger re-render
const renderCount = useRef(0);
useEffect(() => {
  renderCount.current = renderCount.current + 1;
});`
  },
  {
    ...ContextDemo.conceptInfo,
    Component: ContextDemo,
    category: 'Advanced Hooks',
    codeSnippet: `// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Context value at top of tree
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <DeepChild />
    </ThemeContext.Provider>
  );
}

// 3. Consume Context directly in deep child without prop drilling
function DeepChild() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Active Theme: {theme}</div>;
}`
  },
  {
    ...CustomHooksDemo.conceptInfo,
    Component: CustomHooksDemo,
    category: 'Advanced Hooks',
    codeSnippet: `// 1. Custom Hook definition (must start with "use")
function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);
  const toggle = () => setState(prev => !prev);
  return [state, toggle];
}

// 2. Consuming the custom hook in any component
function MyComponent() {
  const [isOpen, toggleOpen] = useToggle(false);
  return <button onClick={toggleOpen}>{isOpen ? 'Close' : 'Open'}</button>;
}`
  }
];

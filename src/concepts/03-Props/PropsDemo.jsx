// Line 1: Import useState from 'react' to build interactive prop customizer.
import { useState } from 'react';

// Line 4: SUB-COMPONENT 1: ProductCard demonstrating prop destructuring & default props.
// Concept: Props are received as a single object parameter. Destructuring { title, price, ... } unpacks them directly.
function ProductCard({
  title,                         // Required string prop
  price,                         // Number prop
  discount = 0,                  // Default prop value: if parent doesn't provide discount, default to 0
  inStock = true,                // Default prop boolean
  onAddToCart,                   // Callback function prop passed down from parent
  children                       // Special 'children' prop: captures JSX passed inside <ProductCard>...</ProductCard>
}) {
  // Line 15: Calculate discounted price locally
  const finalPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);

  // Line 18: Render product card UI
  return (
    <div style={{
      border: '1px solid #cbd5e1',
      borderRadius: '12px',
      padding: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      maxWidth: '360px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Line 28: Title and Stock status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <span style={{
          fontSize: '0.75rem',
          padding: '2px 8px',
          borderRadius: '999px',
          backgroundColor: inStock ? '#dcfce7' : '#fee2e2',
          color: inStock ? '#166534' : '#991b1b',
          fontWeight: 600
        }}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Line 44: Price display with conditional discount strike-through */}
      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#6366f1' }}>
          ${finalPrice}
        </span>
        {discount > 0 && (
          <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.9rem' }}>
            ${price.toFixed(2)} ({discount}% off)
          </span>
        )}
      </div>

      {/* Line 56: Rendering the special 'children' prop */}
      {/* Concept: The children prop lets components act as flexible generic wrappers */}
      <div style={{
        marginTop: '12px',
        padding: '8px 12px',
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        borderRadius: '6px',
        fontSize: '0.85rem'
      }}>
        {children}
      </div>

      {/* Line 68: Button calling parent callback prop on click */}
      {/* Concept: Child cannot mutate parent state directly; it calls the callback function passed via props */}
      <button
        onClick={() => onAddToCart(title, finalPrice)}
        disabled={!inStock}
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '14px' }}
      >
        {inStock ? 'Add to Cart (Trigger Callback)' : 'Unavailable'}
      </button>
    </div>
  );
}

// Line 83: MAIN EXPORTED COMPONENT: PropsDemo
export function PropsDemo() {
  // Line 85: Parent state that will be passed down as props to the child component
  const [productTitle, setProductTitle] = useState('React Masterclass Pro');
  const [productPrice, setProductPrice] = useState(49.99);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [isAvailable, setIsAvailable] = useState(true);
  const [customDescription, setCustomDescription] = useState('Includes 50+ hands-on projects, exercises, and quizzes.');
  const [cartLog, setCartLog] = useState([]);

  // Line 93: Handler function passed down to child as callback prop
  const handleAddToCart = (name, price) => {
    const timestamp = new Date().toLocaleTimeString();
    // Line 96: Append new item to cart log array in parent state
    setCartLog(prev => [{ name, price, timestamp, id: Date.now() }, ...prev]);
  };

  // Line 100: Main return
  return (
    <div className="demo-container">
      {/* Line 102: Title */}
      <h3 className="demo-title">Module 03: Props (Properties) & Unidirectional Data Flow</h3>

      {/* Line 105: Concept description */}
      <p className="demo-description">
        Props are read-only inputs passed from parent components to child components.
        Data flows downwards (Unidirectional Flow), while callbacks allow children to communicate upwards.
      </p>

      {/* Line 111: Interactive Prop Controller Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="interactive-box">
          <h4>Configure Parent Props:</h4>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Product Title:</label>
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="input-field"
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Base Price ($):</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(parseFloat(e.target.value) || 0)}
              className="input-field"
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Discount ({discountPercent}%):</label>
            <input
              type="range"
              min="0"
              max="70"
              step="5"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
              In Stock (Boolean Prop)
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Children Content (JSX slot):</label>
            <input
              type="text"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Line 166: Render child component passing props */}
        <div>
          <h4>Child Component Rendered with Props:</h4>
          <ProductCard
            title={productTitle}
            price={productPrice}
            discount={discountPercent}
            inStock={isAvailable}
            onAddToCart={handleAddToCart}
          >
            {/* Line 176: This JSX is received by ProductCard as the 'children' prop */}
            <p style={{ margin: 0 }}>{customDescription}</p>
          </ProductCard>

          {/* Line 180: Displaying events triggered from child to parent */}
          {cartLog.length > 0 && (
            <div style={{ marginTop: '16px', fontSize: '0.85rem' }}>
              <strong>Parent received Callback ({cartLog.length} actions):</strong>
              <ul style={{ margin: '6px 0', paddingLeft: '20px' }}>
                {cartLog.slice(0, 3).map(item => (
                  <li key={item.id}>
                    Added "{item.name}" (${item.price}) at {item.timestamp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Line 197: Summary card */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Essential Props Rules:</strong>
        <ul>
          <li><strong>Props are Read-Only (Immutable):</strong> Never write <code>props.title = 'New'</code>.</li>
          <li><strong>Unidirectional Flow:</strong> Data moves from Top to Bottom (Parent to Child).</li>
          <li><strong>Lifting State Up:</strong> To notify a parent of changes, pass down a function prop (callback).</li>
          <li><strong>Children Prop:</strong> Anything nested inside <code>&lt;Component&gt;...&lt;/Component&gt;</code> is automatically passed as <code>children</code>.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 212: Dashboard metadata
PropsDemo.conceptInfo = {
  id: '03-props',
  title: '03. Props & Data Flow',
  level: 'Beginner',
  file: 'src/concepts/03-Props/PropsDemo.jsx',
  summary: 'Learn how to pass information into components, use destructuring, default props, children, and callback props.',
  keyTakeaways: [
    'Props allow parent components to configure child components with data.',
    'Destructuring props clean up syntax: ({ title, price }) instead of (props).',
    'Props are strictly read-only; components must never modify their own props.',
    'The children prop enables flexible container components.'
  ],
  challenge: 'Open src/concepts/03-Props/PropsDemo.jsx and add a new prop `badgeText` to `<ProductCard />` to display a custom promotional badge.'
};

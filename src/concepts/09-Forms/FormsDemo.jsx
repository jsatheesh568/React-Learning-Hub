// Line 1: Import useState from 'react' to manage controlled form inputs.
import { useState } from 'react';

// Line 4: Initial form state definition for easy reset.
const initialFormState = {
  fullName: '',
  email: '',
  experienceLevel: 'beginner',
  agreeToTerms: false
};

// Line 12: MAIN EXPORTED COMPONENT: FormsDemo
// Concept: Controlled Components have their form input value tied directly to React state.
export function FormsDemo() {
  // Line 15: Single state object holding all form fields.
  const [formData, setFormData] = useState(initialFormState);
  // Line 17: State for tracking validation error messages.
  const [errors, setErrors] = useState({});
  // Line 19: State for showing successful submission payload.
  const [submittedData, setSubmittedData] = useState(null);

  // Line 22: Generic change handler for MULTIPLE form inputs.
  // Concept: By giving each input a 'name' attribute matching the state key, one handler manages all fields!
  const handleChange = (e) => {
    // Line 25: Extract name, value, type, and checked properties from the target event element.
    const { name, value, type, checked } = e.target;

    // Line 28: Use computed property name [name] with spread operator to update the specific field.
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Line 34: Clear existing error for this field as the user types.
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Line 40: Client-side validation function.
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms to proceed.';
    }
    return newErrors;
  };

  // Line 57: Form submission handler.
  const handleSubmit = (e) => {
    // Line 59: Prevent browser from doing a default GET/POST page reload.
    e.preventDefault();

    // Line 62: Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedData(null);
      return;
    }

    // Line 70: Save successfully submitted snapshot
    setSubmittedData({ ...formData, timestamp: new Date().toLocaleTimeString() });
  };

  // Line 74: Reset handler to restore initial empty form.
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmittedData(null);
  };

  // Line 81: Return JSX
  return (
    <div className="demo-container">
      {/* Line 83: Title */}
      <h3 className="demo-title">Module 09: Forms & Controlled Components</h3>

      {/* Line 86: Overview */}
      <p className="demo-description">
        In Controlled Components, React state serves as the "single source of truth".
        Every input's <code>value</code> is driven by state, and changes invoke <code>onChange</code>.
      </p>

      {/* Line 92: Interactive Form Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="interactive-box">
          <h4>Controlled Form:</h4>
          
          <form onSubmit={handleSubmit}>
            {/* Line 98: Text Input */}
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="fullName" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                Full Name:
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Developer"
                className="input-field"
                style={{ borderColor: errors.fullName ? '#ef4444' : undefined }}
              />
              {errors.fullName && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.fullName}</span>}
            </div>

            {/* Line 116: Email Input */}
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                Email Address:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="input-field"
                style={{ borderColor: errors.email ? '#ef4444' : undefined }}
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.email}</span>}
            </div>

            {/* Line 134: Select Dropdown */}
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="experienceLevel" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                React Experience Level:
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="input-field"
              >
                <option value="beginner">Beginner (Learning Basics)</option>
                <option value="intermediate">Intermediate (Building Projects)</option>
                <option value="advanced">Advanced (Production Architect)</option>
              </select>
            </div>

            {/* Line 152: Checkbox Input */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                I agree to the practice curriculum terms
              </label>
              {errors.agreeToTerms && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{errors.agreeToTerms}</div>}
            </div>

            {/* Line 166: Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-primary">
                Submit Form
              </button>
              <button type="button" onClick={handleReset} className="btn btn-outline">
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Line 178: Real-Time State Inspector */}
        <div className="interactive-box">
          <h4>Live Form State Inspector:</h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Watch this JSON object update instantly with every keystroke:
          </p>
          <pre style={{
            background: '#0f172a',
            color: '#38bdf8',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            overflow: 'auto'
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>

          {submittedData && (
            <div style={{
              marginTop: '12px',
              padding: '10px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid #10b981',
              borderRadius: '6px',
              fontSize: '0.85rem'
            }}>
              <strong style={{ color: '#10b981' }}>✅ Form Successfully Submitted!</strong>
              <div style={{ marginTop: '4px', fontSize: '0.8rem', color: '#64748b' }}>Timestamp: {submittedData.timestamp}</div>
            </div>
          )}
        </div>
      </div>

      {/* Line 212: Form Rules Card */}
      <div className="info-box" style={{ marginTop: '16px' }}>
        <strong>Controlled Components Best Practices:</strong>
        <ul>
          <li>Always pair <code>value={'{state}'}</code> with an <code>onChange</code> handler. Without onChange, the input is read-only.</li>
          <li>For checkboxes, use the <code>checked</code> attribute instead of <code>value</code>.</li>
          <li>Use the computed property syntax <code>[e.target.name]: e.target.value</code> to handle dozens of inputs with a single clean function.</li>
        </ul>
      </div>
    </div>
  );
}

// Line 226: Metadata
FormsDemo.conceptInfo = {
  id: '09-forms',
  title: '09. Forms & Controlled Components',
  level: 'Intermediate',
  file: 'src/concepts/09-Forms/FormsDemo.jsx',
  summary: 'Learn controlled inputs, managing multi-field forms with a single state object, validation, and reset patterns.',
  keyTakeaways: [
    'Controlled inputs derive their value from React state.',
    'Any user input triggers an onChange event which updates the state.',
    'Computed property names [name] allow one handler to manage multiple fields.',
    'Always intercept form submission with e.preventDefault().'
  ],
  challenge: 'Open src/concepts/09-Forms/FormsDemo.jsx and add a new "Phone Number" input field with validation.'
};

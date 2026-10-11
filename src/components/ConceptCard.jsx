// Line 1: Import useState and useContext from 'react'.
import { useState, useContext } from 'react';
// Line 3: Import ThemeContext.
import { ThemeContext } from '../context/ThemeContext';
// Line 5: Import CodeViewer component.
import { CodeViewer } from './CodeViewer';
// Line 7: Import Lucide icons.
import { Play, Code, Trophy, CheckCircle, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';

// Line 10: Export ConceptCard component.
export function ConceptCard({
  concept,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) {
  // Line 17: Active tab state: 'demo' | 'code' | 'challenge'
  const [activeTab, setActiveTab] = useState('demo');
  // Line 19: Context for completion state
  const { completedConcepts, toggleConceptCompleted } = useContext(ThemeContext);

  const isCompleted = completedConcepts.includes(concept.id);
  const ActiveComponent = concept.Component;

  return (
    <article className="concept-card">
      {/* Concept Header */}
      <div className="concept-header">
        <div className="concept-header-meta">
          <span className="concept-category-badge">{concept.category}</span>
          <span className={`level-badge ${concept.level.toLowerCase()}`}>{concept.level}</span>
          <span className="concept-file-badge">
            <ExternalLink size={12} /> {concept.file}
          </span>
        </div>

        <div className="concept-title-row">
          <h2 className="concept-main-title">{concept.title}</h2>
          
          <button
            onClick={() => toggleConceptCompleted(concept.id)}
            className={`mark-mastered-btn ${isCompleted ? 'mastered' : ''}`}
          >
            <CheckCircle size={16} />
            {isCompleted ? 'Mastered!' : 'Mark as Mastered'}
          </button>
        </div>

        <p className="concept-summary-text">{concept.summary}</p>

        {/* Tab Navigation */}
        <div className="concept-tabs">
          <button
            onClick={() => setActiveTab('demo')}
            className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          >
            <Play size={16} />
            <span>Interactive Demo</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
          >
            <Code size={16} />
            <span>Annotated Code & Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
          >
            <Trophy size={16} />
            <span>Coding Challenge</span>
          </button>
        </div>
      </div>

      {/* Concept Body based on activeTab */}
      <div className="concept-body">
        {activeTab === 'demo' && (
          <div className="tab-pane active-demo-pane">
            <ActiveComponent />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="tab-pane active-code-pane">
            <div className="code-breakdown-grid">
              <div>
                <h4 style={{ marginBottom: '8px' }}>Concept Blueprint & Patterns:</h4>
                <CodeViewer code={concept.codeSnippet} filePath={concept.file} />
              </div>

              <div className="key-takeaways-card">
                <h4>Core Takeaways & Rules:</h4>
                <ul>
                  {concept.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>

                <div className="source-note">
                  <strong>💡 Pro Tip:</strong> Open <code>{concept.file}</code> in your code editor to read full, line-by-line pedagogical annotations for every single line of code!
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && (
          <div className="tab-pane active-challenge-pane">
            <div className="challenge-box">
              <div className="challenge-icon">🎯</div>
              <div className="challenge-content">
                <h3>Hands-On Practice Challenge</h3>
                <p className="challenge-prompt">{concept.challenge}</p>

                <div className="challenge-steps">
                  <strong>How to complete this challenge:</strong>
                  <ol>
                    <li>Open <code>{concept.file}</code> in your code editor.</li>
                    <li>Follow the challenge instructions in the file comments.</li>
                    <li>Save the file and watch Vite Hot Module Replacement (HMR) update your screen instantly!</li>
                    <li>Once you see your changes work, check the "Mark as Mastered" button above.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="concept-footer-nav">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="btn btn-outline footer-nav-btn"
        >
          <ArrowLeft size={16} />
          <span>Previous Concept</span>
        </button>

        <span className="concept-pager-info">
          Editing file: <code>{concept.file}</code>
        </span>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="btn btn-primary footer-nav-btn"
        >
          <span>Next Concept</span>
          <ArrowRight size={16} />
        </button>
      </footer>
    </article>
  );
}

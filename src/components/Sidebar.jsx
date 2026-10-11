// Line 1: Import useState and useContext from 'react'.
import { useState, useContext } from 'react';
// Line 3: Import ThemeContext to read and update completed concepts.
import { ThemeContext } from '../context/ThemeContext';
// Line 5: Import Lucide icons.
import { Search, CheckCircle, Circle } from 'lucide-react';

// Line 8: Export Sidebar component.
export function Sidebar({ concepts, activeConceptId, onSelectConcept }) {
  // Line 10: State for search filter keyword.
  const [searchQuery, setSearchQuery] = useState('');
  // Line 12: State for category filter.
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Line 14: Read context for completion statuses.
  const { completedConcepts, toggleConceptCompleted } = useContext(ThemeContext);

  // Line 17: Unique categories list.
  const categories = ['All', 'Fundamentals', 'Core Hooks', 'Patterns', 'Advanced Hooks'];

  // Line 20: Filter concepts based on search query and category.
  const filteredConcepts = concepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          concept.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || concept.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Line 29: Return JSX.
  return (
    <aside className="app-sidebar">
      {/* Search Input */}
      <div className="sidebar-search">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search concepts (e.g. state, effect, props)..."
          className="search-input"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="search-clear-btn">✕</button>
        )}
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Concepts Navigation List */}
      <nav className="concepts-nav">
        {filteredConcepts.length === 0 ? (
          <div className="no-results">No concepts found matching "{searchQuery}"</div>
        ) : (
          filteredConcepts.map((concept) => {
            const isCompleted = completedConcepts.includes(concept.id);
            const isActive = activeConceptId === concept.id;

            return (
              <div
                key={concept.id}
                className={`concept-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => onSelectConcept(concept.id)}
              >
                {/* Completion checkbox button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Stop click from triggering parent onSelectConcept
                    toggleConceptCompleted(concept.id);
                  }}
                  className="completion-btn"
                  title={isCompleted ? 'Mark as incomplete' : 'Mark as mastered'}
                >
                  {isCompleted ? (
                    <CheckCircle size={18} color="#10b981" />
                  ) : (
                    <Circle size={18} color="#94a3b8" />
                  )}
                </button>

                {/* Concept info */}
                <div className="concept-nav-text">
                  <div className="concept-nav-header">
                    <span className="concept-nav-title">{concept.title}</span>
                    <span className={`level-badge ${concept.level.toLowerCase()}`}>
                      {concept.level}
                    </span>
                  </div>
                  <span className="concept-nav-file">{concept.file}</span>
                </div>
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}

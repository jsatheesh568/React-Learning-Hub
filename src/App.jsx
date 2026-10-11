// Line 1: Import useState and useEffect hooks from 'react'.
import { useState, useEffect } from 'react';
// Line 3: Import ThemeProvider from context.
import { ThemeProvider } from './context/ThemeContext';
// Line 5: Import UI layout components.
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ConceptCard } from './components/ConceptCard';
// Line 9: Import the list of 12 core React concepts.
import { CONCEPTS_LIST } from './data/conceptsList';

// Line 12: Inner application component where theme context is accessible.
function AppContent() {
  // Line 14: State managing the currently viewed concept ID.
  const [activeConceptId, setActiveConceptId] = useState(() => {
    // Read last viewed concept from localStorage or start at the beginning (01-jsx)
    return localStorage.getItem('react_lab_active_concept') || '01-jsx';
  });

  // Line 20: Persist active concept ID when changed.
  useEffect(() => {
    localStorage.setItem('react_lab_active_concept', activeConceptId);
  }, [activeConceptId]);

  // Line 25: Find active concept object and its index in the array.
  const activeIndex = CONCEPTS_LIST.findIndex(c => c.id === activeConceptId);
  const currentConcept = CONCEPTS_LIST[activeIndex] || CONCEPTS_LIST[0];

  // Line 29: Navigation handlers.
  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveConceptId(CONCEPTS_LIST[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < CONCEPTS_LIST.length - 1) {
      setActiveConceptId(CONCEPTS_LIST[activeIndex + 1].id);
    }
  };

  // Line 41: Return JSX layout.
  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar totalConcepts={CONCEPTS_LIST.length} />

      {/* Main Container */}
      <div className="app-container">
        {/* Left Sidebar */}
        <Sidebar
          concepts={CONCEPTS_LIST}
          activeConceptId={currentConcept.id}
          onSelectConcept={setActiveConceptId}
        />

        {/* Center Content Area */}
        <main className="app-main-content">
          <ConceptCard
            concept={currentConcept}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={activeIndex > 0}
            hasNext={activeIndex < CONCEPTS_LIST.length - 1}
          />
        </main>
      </div>
    </div>
  );
}

// Line 72: Root App Component wrapped with ThemeProvider.
// Concept: ThemeProvider broadcasts theme and progress state to all child components.
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

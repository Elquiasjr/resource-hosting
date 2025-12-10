import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ResourcePage from './components/ResourcePage';

export default function App() {
  const [currentResourceIndex, setCurrentResourceIndex] = useState<number>(() => {
    const saved = localStorage.getItem('currentResourceIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

    const [completedResources, setCompletedResources] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('completedResources');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('currentResourceIndex', currentResourceIndex.toString());
  }, [currentResourceIndex]);

  useEffect(() => {
    localStorage.setItem('completedResources', JSON.stringify(Array.from(completedResources)));
  }, [completedResources]);

  const setCurrentResource = useCallback((index: number) => {
    setCurrentResourceIndex(index);
  }, []);

  const markAsCompleted = useCallback((index: number) => {
    setCompletedResources(prev => {
      if (prev.has(index)) {
        return prev;
      }
      return new Set(prev).add(index);
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCurrentResourceIndex(0);
    setCompletedResources(new Set());
    localStorage.removeItem('currentResourceIndex');
    localStorage.removeItem('completedResources');
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/resource-hosting/" 
          element={
            <LandingPage 
              currentResourceIndex={currentResourceIndex}
              completedResources={completedResources}
              resetProgress={resetProgress}
            />
          } 
        />
        <Route 
          path="/trilha/:id" 
          element={
            <ResourcePage 
              currentResourceIndex={currentResourceIndex}
              setCurrentResource={setCurrentResource}
              markAsCompleted={markAsCompleted}
              completedResources={completedResources}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext'; 
import MainContent from './components/MainContent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
}

export default App;




















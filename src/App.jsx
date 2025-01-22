import React from 'react';
import './App.css';
import TSPDashboard from './Components/TSPDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          TSP Dashboard
        </h1>
        <TSPDashboard />
      </div>
    </div>
  );
}

export default App;
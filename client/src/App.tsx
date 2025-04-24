import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GasTracker</h1>
        <p>Ethereum Gas Fee Monitor</p>
      </header>
      <main>
        <div className="gas-info">
          <p>Loading gas prices...</p>
        </div>
      </main>
    </div>
  );
}

export default App;
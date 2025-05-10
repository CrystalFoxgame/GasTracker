import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PriceAlert from './components/PriceAlert';
import './App.css';

interface GasPrice {
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
}

function App() {
  const [gasPrice, setGasPrice] = useState<GasPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchGasPrice = async () => {
    try {
      const response = await axios.get('/api/gas/current');
      if (response.data.success) {
        setGasPrice(response.data.data);
        setError(null);
      } else {
        setError('Failed to fetch gas prices');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>GasTracker</h1>
        <p>Ethereum Gas Fee Monitor</p>
      </header>
      <main>
        <div className="gas-info">
          {loading && <p>Loading gas prices...</p>}
          {error && <p className="error">{error}</p>}
          {gasPrice && (
            <div className="gas-prices">
              <div className="gas-price-item">
                <h3>Safe</h3>
                <span className="price">{gasPrice.SafeGasPrice} gwei</span>
              </div>
              <div className="gas-price-item">
                <h3>Standard</h3>
                <span className="price">{gasPrice.ProposeGasPrice} gwei</span>
              </div>
              <div className="gas-price-item">
                <h3>Fast</h3>
                <span className="price">{gasPrice.FastGasPrice} gwei</span>
              </div>
            </div>
          )}
        </div>
        {gasPrice && (
          <PriceAlert currentPrice={parseInt(gasPrice.ProposeGasPrice)} />
        )}
      </main>
    </div>
  );
}

export default App;
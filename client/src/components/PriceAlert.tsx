import React, { useState } from 'react';
import './PriceAlert.css';

interface PriceAlertProps {
  currentPrice: number;
}

const PriceAlert: React.FC<PriceAlertProps> = ({ currentPrice }) => {
  const [alertPrice, setAlertPrice] = useState<number>(0);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertPrice > 0) {
      setIsEnabled(true);
      localStorage.setItem('gasAlertPrice', alertPrice.toString());
      localStorage.setItem('gasAlertEnabled', 'true');
      alert(`Alert set for ${alertPrice} gwei!`);
    }
  };

  const checkAlert = () => {
    if (isEnabled && currentPrice <= alertPrice && currentPrice > 0) {
      if (Notification.permission === 'granted') {
        new Notification('GasTracker Alert', {
          body: `Gas price is now ${currentPrice} gwei (target: ${alertPrice} gwei)`,
          icon: '/favicon.ico'
        });
      } else {
        alert(`Gas price alert: ${currentPrice} gwei (target: ${alertPrice} gwei)`);
      }
      setIsEnabled(false);
      localStorage.setItem('gasAlertEnabled', 'false');
    }
  };

  React.useEffect(() => {
    checkAlert();
  }, [currentPrice]);

  React.useEffect(() => {
    const savedPrice = localStorage.getItem('gasAlertPrice');
    const savedEnabled = localStorage.getItem('gasAlertEnabled');
    if (savedPrice) setAlertPrice(parseInt(savedPrice));
    if (savedEnabled === 'true') setIsEnabled(true);

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="price-alert">
      <h3>Price Alert</h3>
      <form onSubmit={handleSubmit}>
        <div className="alert-input">
          <input
            type="number"
            value={alertPrice || ''}
            onChange={(e) => setAlertPrice(parseInt(e.target.value) || 0)}
            placeholder="Alert price (gwei)"
            min="1"
            max="1000"
          />
          <button type="submit" disabled={alertPrice <= 0}>
            {isEnabled ? 'Update Alert' : 'Set Alert'}
          </button>
        </div>
      </form>
      {isEnabled && (
        <p className="alert-status">
          Alert active: Notify when gas ≤ {alertPrice} gwei
        </p>
      )}
    </div>
  );
};

export default PriceAlert;
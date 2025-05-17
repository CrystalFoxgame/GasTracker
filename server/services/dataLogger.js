const fs = require('fs');
const path = require('path');

class DataLogger {
  constructor() {
    this.dataFile = path.join(__dirname, '../data/gasHistory.json');
    this.ensureDataDirectory();
  }

  ensureDataDirectory() {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(this.dataFile, JSON.stringify([], null, 2));
    }
  }

  logGasPrice(gasData) {
    try {
      const data = this.readData();
      const entry = {
        timestamp: new Date().toISOString(),
        safeGasPrice: parseInt(gasData.SafeGasPrice),
        standardGasPrice: parseInt(gasData.ProposeGasPrice),
        fastGasPrice: parseInt(gasData.FastGasPrice)
      };

      data.push(entry);

      // Keep only last 1000 entries to prevent file from getting too large
      if (data.length > 1000) {
        data.splice(0, data.length - 1000);
      }

      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error logging gas price data:', error);
      return false;
    }
  }

  readData() {
    try {
      const rawData = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error reading gas price data:', error);
      return [];
    }
  }

  getHistoryData(hours = 24) {
    const data = this.readData();
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - hours);

    return data.filter(entry => new Date(entry.timestamp) >= cutoff);
  }
}

module.exports = DataLogger;
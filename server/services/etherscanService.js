const axios = require('axios');

class EtherscanService {
  constructor() {
    this.baseURL = 'https://api.etherscan.io/api';
    this.apiKey = process.env.ETHERSCAN_API_KEY;
  }

  async getGasPrice() {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          module: 'gastracker',
          action: 'gasoracle',
          apikey: this.apiKey
        }
      });
      
      if (response.data.status === '1') {
        return response.data.result;
      } else {
        throw new Error('Failed to fetch gas price');
      }
    } catch (error) {
      console.error('Error fetching gas price:', error);
      throw error;
    }
  }

  async getGasHistory() {
    // Placeholder for gas history functionality
    return {
      message: 'Gas history feature coming soon',
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = EtherscanService;
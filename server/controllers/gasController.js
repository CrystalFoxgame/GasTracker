const EtherscanService = require('../services/etherscanService');

const etherscanService = new EtherscanService();

const getCurrentGasPrice = async (req, res) => {
  try {
    const gasData = await etherscanService.getGasPrice();
    res.json({
      success: true,
      data: gasData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gas price',
      message: error.message
    });
  }
};

const getGasHistory = async (req, res) => {
  try {
    const historyData = await etherscanService.getGasHistory();
    res.json({
      success: true,
      data: historyData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gas history',
      message: error.message
    });
  }
};

module.exports = {
  getCurrentGasPrice,
  getGasHistory
};
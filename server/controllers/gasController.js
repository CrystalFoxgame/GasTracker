const EtherscanService = require('../services/etherscanService');
const DataLogger = require('../services/dataLogger');

const etherscanService = new EtherscanService();
const dataLogger = new DataLogger();

const getCurrentGasPrice = async (req, res) => {
  try {
    const gasData = await etherscanService.getGasPrice();
    
    // Log the data for historical tracking
    dataLogger.logGasPrice(gasData);
    
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
    const hours = parseInt(req.query.hours) || 24;
    const historyData = dataLogger.getHistoryData(hours);
    
    res.json({
      success: true,
      data: historyData,
      timestamp: new Date().toISOString(),
      count: historyData.length
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
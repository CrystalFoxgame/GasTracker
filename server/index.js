const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getCurrentGasPrice, getGasHistory } = require('./controllers/gasController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GasTracker API is running' });
});

app.get('/api/gas/current', getCurrentGasPrice);
app.get('/api/gas/history', getGasHistory);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
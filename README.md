# GasTracker

Real-time Ethereum gas fee tracker with price alerts and historical data.

## Features
- ⛽ Real-time gas price monitoring (Safe/Standard/Fast)
- 🔔 Price alert notifications when gas drops to target level
- 📊 Historical data logging and tracking
- 📱 Responsive web interface
- 🔄 Auto-refresh every 30 seconds

## Tech Stack
- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **API**: Etherscan API
- **Storage**: JSON file-based logging

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```
3. Create `.env` file with your Etherscan API key:
   ```
   ETHERSCAN_API_KEY=your_api_key_here
   ```
4. Start the development servers:
   ```bash
   npm run dev
   ```

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/gas/current` - Current gas prices
- `GET /api/gas/history?hours=24` - Historical data

## License
MIT
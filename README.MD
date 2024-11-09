# Stock Screening Tool 🚀

All credits go to [Screener.in](https://www.screener.in) for creating the original tool.

A web-based stock screening application that allows users to filter and analyze stocks based on various financial parameters, inspired by [Screener.in](https://www.screener.in). Built with React frontend and Go backend.

## 🧪 Testing
- The application is up and running on [https://stock-screening-tool.vercel.app](https://stock-screening-tool.vercel.app).

- Please wait for 15 seconds for the application to fully connect with the backend.

- Frontend is deployed on [vercel](https://vercel.com/) and backend is deployed on [render](https://render.com/).

- Frontend URL: [https://stock-screening-tool.vercel.app](https://stock-screening-tool.vercel.app)

- Backend API: [https://hiddenalpha-backend-api.onrender.com](https://hiddenalpha-backend-api.onrender.com)

## 📌 Features

- **Advanced Stock Filtering**: Query-like interface for filtering stocks
- **Multiple Financial Parameters**: Filter stocks based on 9 key financial metrics:
  - Market Capitalization
  - P/E Ratio
  - ROE (Return on Equity)
  - Debt-to-Equity Ratio
  - Dividend Yield
  - Revenue Growth
  - EPS Growth
  - Current Ratio
  - Gross Margin
- **Interactive Data Table**: 
  - Sortable columns
  - Pagination (10 stocks per page)
- **Screener.in-Inspired UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- React

### Backend
- Go
- Framework: Gin

## 🚀 Getting Started

### Prerequisites
- Docker
- Docker Compose

That's all! No need to install Node.js, Go, or any other dependencies locally. Docker will handle everything for you.

### Installation

1. Clone the repository
```bash
git clone https://github.com/Souvik-Cyclic/Stock-Screening-Tool
cd Stock-Screening-Tool
```

2. Start the application using Docker Compose
```bash
docker-compose up --build
```
The application will be available at `http://localhost:3000`

To stop the application:
```bash
docker-compose down
```

## 🎯 Usage Examples

### Sample Query 1
```
Market capitalization > 100 AND
Price to earning < 10 AND
Return on capital employed > 10%
```

### Sample Query 2
```
Debt to Equity > 1 AND
Dividend Yield > 1% AND
Revenue Growth > 1%
```

### Sample Query 3
```
EPS Growth > 2% AND
Current Ratio > 2 AND
Gross Margin > 2%
```

Financial Parameters: 
- Market Capitalization
- Price to earning 
- Return on capital employed (%)
- Debt to Equity
- Dividend Yield (%)
- Revenue Growth (%)
- EPS Growth (%)
- Current Ratio
- Gross Margin (%)

## 📁 Project Structure
```
stock-screening-tool/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── App.js
│   ├── App.css
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
├── server/
│   ├── go.mod
│   ├── go.sum
│   └── main.go
│   ├── stocks.json
│   ├── Dockerfile
│   ├── docker-compose.yml
└── README.md
```

## 🔍 API Endpoints

The API runs on `http://localhost:8080`.

### GET /
Returns the health status of the API.
```json
{"message":"Backend is alive"}
```

### POST /api/screen
Accepts screening criteria and returns filtered stocks
```json
{
	"query":    "Market capitalization > 100 AND
                Price to earning < 10 AND
                Return on capital employed > 10%" 
}
```

## 🙏 Acknowledgments
- Inspired by [Screener.in](https://www.screener.in)
- [UiVerse](https://uiverse.io/satyamchaudharydev/plastic-bobcat-37)
- [SVG Repo](https://www.svgrepo.com/)

## 📧 Contact
Souvik Kumar 

[Mail](mailto:souvik.cyc@gmail.com) 

[GitHub](https://github.com/Souvik-Cyclic) 

[Linkedin](https://www.linkedin.com/in/Souvik-Cyclic/)

Project Link: [https://github.com/Souvik-Cyclic/Stock-Screening-Tool](https://github.com/Souvik-Cyclic/Stock-Screening-Tool)
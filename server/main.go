package main

import (
	"encoding/json"
	"fmt"
	"os"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type Stock struct {
	Ticker         string `json:"Ticker"`
	MarketCap      string `json:"Market Capitalization (B)"`
	PERatio        string `json:"P/E Ratio"`
	ROE            string `json:"ROE (%)"`
	DebtToEquity   string `json:"Debt-to-Equity Ratio"`
	DividendYield  string `json:"Dividend Yield (%)"`
	RevenueGrowth  string `json:"Revenue Growth (%)"`
	EPSGrowth      string `json:"EPS Growth (%)"`
	CurrentRatio   string `json:"Current Ratio"`
	GrossMargin    string `json:"Gross Margin (%)"`
}

type Condition struct {
	Field    string
	Operator string
	Value    float64
}

type Response struct {
	Success bool        `json:"success"`
	Data    []Stock     `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

var stocksData []Stock

var fieldMappings = map[string]string{
	"Market capitalization": "Market_Capitalization",
	"Price to earning":             "PE_Ratio",
	"Return on capital employed": "ROE",
	"Debt to Equity":        "Debt_to_Equity",
	"Dividend Yield":        "Dividend_Yield",
	"Revenue Growth":        "Revenue_Growth",
	"EPS Growth":            "EPS_Growth",
	"Current Ratio":         "Current_Ratio",
	"Gross Margin":          "Gross_Margin",
}

func Initialize() error {
	data, err := os.ReadFile("stocks.json")
	if err != nil {
		return fmt.Errorf("error reading stocks.json: %v", err)
	}

	err = json.Unmarshal(data, &stocksData)
	if err != nil {
		return fmt.Errorf("error parsing JSON: %v", err)
	}

	return nil
}

func parseCondition(conditionStr string) (Condition, error) {
	conditionStr = strings.TrimSpace(conditionStr)

	var operator string
	var fieldName string
	var valueStr string

	for _, op := range []string{">=", "<=", ">", "<", "=", "=="} {
		if strings.Contains(conditionStr, op) {
			operator = op
			parts := strings.SplitN(conditionStr, op, 2)
			fieldName = strings.TrimSpace(parts[0])
			valueStr = strings.TrimSpace(parts[1])
			break
		}
	}

	if operator == "" {
		return Condition{}, fmt.Errorf("invalid condition format: %s", conditionStr)
	}

	field, found := fieldMappings[fieldName]
	if !found {
		return Condition{}, fmt.Errorf("unknown field: %s", fieldName)
	}

	valueStr = strings.TrimSuffix(valueStr, "%")
	value, err := strconv.ParseFloat(valueStr, 64)
	if err != nil {
		return Condition{}, fmt.Errorf("invalid number value: %s", valueStr)
	}

	return Condition{
		Field:    field,
		Operator: operator,
		Value:    value,
	}, nil
}

func parseUserQuery(query string) ([]Condition, error) {
	conditions := []Condition{}
	parts := strings.Split(query, "AND")
	for _, part := range parts {
		part = strings.TrimSpace(part)

		orParts := strings.Split(part, "OR")
		for _, orPart := range orParts {
			orPart = strings.TrimSpace(orPart)

			condition, err := parseCondition(orPart)
			if err != nil {
				return nil, err
			}
			conditions = append(conditions, condition)
		}
	}

	return conditions, nil
}

func GetFieldValue(stock Stock, field string) (float64, error) {
	var strValue string

	switch field {
	case "Market_Capitalization":
		strValue = stock.MarketCap
	case "PE_Ratio":
		strValue = stock.PERatio
	case "ROE":
		strValue = stock.ROE
	case "Debt_to_Equity":
		strValue = stock.DebtToEquity
	case "Dividend_Yield":
		strValue = stock.DividendYield
	case "Revenue_Growth":
		strValue = stock.RevenueGrowth
	case "EPS_Growth":
		strValue = stock.EPSGrowth
	case "Current_Ratio":
		strValue = stock.CurrentRatio
	case "Gross_Margin":
		strValue = stock.GrossMargin
	default:
		return 0, fmt.Errorf("unknown field: %s", field)
	}

	strValue = strings.TrimSuffix(strValue, "%")
	return strconv.ParseFloat(strValue, 64)
}

func MeetsCondition(stock Stock, condition Condition) (bool, error) {
	value, err := GetFieldValue(stock, condition.Field)
	if err != nil {
		return false, err
	}

	switch condition.Operator {
	case ">":
		return value > condition.Value, nil
	case "<":
		return value < condition.Value, nil
	case "=", "==":
		return value == condition.Value, nil
	case ">=":
		return value >= condition.Value, nil
	case "<=":
		return value <= condition.Value, nil
	default:
		return false, fmt.Errorf("invalid operator: %s", condition.Operator)
	}
}

func FilterStocks(stocks []Stock, conditions []Condition) ([]Stock, error) {
	var filteredStocks []Stock

	for _, stock := range stocks {
		meetsAllConditions := true

		for _, condition := range conditions {
			meets, err := MeetsCondition(stock, condition)
			if err != nil {
				return nil, fmt.Errorf("error processing stock %s: %v", stock.Ticker, err)
			}

			if !meets {
				meetsAllConditions = false
				break
			}
		}

		if meetsAllConditions {
			filteredStocks = append(filteredStocks, stock)
		}
	}

	return filteredStocks, nil
}

func handleFilter(c *gin.Context) {
	var request struct {
		Query string `json:"query"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, Response{
			Success: false,
			Error:   "Invalid request format",
		})
		return
	}

	conditions, err := parseUserQuery(request.Query)
	if err != nil {
		c.JSON(http.StatusBadRequest, Response{
			Success: false,
			Error:   fmt.Sprintf("Invalid condition: %v", err),
		})
		return
	}

	filteredStocks, err := FilterStocks(stocksData, conditions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, Response{
			Success: false,
			Error:   fmt.Sprintf("Error filtering stocks: %v", err),
		})
		return
	}

	if(len(filteredStocks) == 0) {
		c.JSON(http.StatusOK, Response{
			Success: false,
			Error: "No stocks match the given conditions",
		})
		return
	}

	c.JSON(http.StatusOK, Response{
		Success: true,
		Data:    filteredStocks,
	})
}

func handleHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Backend is alive",
	})
}

func main() {
	if err := Initialize(); err != nil {
		fmt.Printf("Error initializing: %v\n", err)
		return
	}

	router := gin.Default()

	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	//Endpoints
	router.GET("/", handleHealth)
	router.POST("/filter", handleFilter)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server starting on :%s...\n", port)
	if err := router.Run(":" + port); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}


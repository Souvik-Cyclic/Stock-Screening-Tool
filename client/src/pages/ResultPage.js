import React from "react";
import "./ResultPage.css";
import { useLocation } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="results-container">
      <h2>Query Results</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available. Please run a query first.</p>
      )}
    </div>
  );
}

export default ResultPage;
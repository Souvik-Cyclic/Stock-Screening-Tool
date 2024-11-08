import React from "react";
import "../styles/SearchQuery.css";

function SearchQuery({ query, setQuery }) {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="query-section">
      <div className="query-label">Query</div>
      <div className="query-container">
        <textarea
          className="query-input"
          value={query}
          onChange={handleInputChange}
        ></textarea>
        <div className="example-box">
          <h4>Custom query example</h4>
          <div className="example-text">
            Market capitalization &gt; 500 AND
            <br />
            Price to earning &lt; 15 AND
            <br />
            Return on capital employed &gt; 22%
          </div>
          <a href="/" className="guide-link">
            Detailed guide on creating screens
          </a>
        </div>
      </div>
    </div>
  );
}

export default SearchQuery;

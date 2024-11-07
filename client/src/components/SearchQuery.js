import React from 'react';
import '../styles/SearchQuery.css';

function SearchQuery() {
  return (
    <div className="query-section">
      <div className="query-label">Query</div>
      <div className="query-container">
        <textarea
          className="query-input"
          placeholder="Enter your search query here"
        ></textarea>

        <div className="example-box">
          <h3>Custom query example</h3>
          <div className="example-text">
            Market capitalization &gt; 500 AND<br />
            Price to earnings &lt; 15 AND<br />
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

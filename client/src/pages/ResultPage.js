import React, { useState } from "react";
import "./ResultPage.css";
import { useLocation } from "react-router-dom";
import SearchQuery from "../components/SearchQuery";
import CheckboxSection from "../components/CheckboxSection";
import ButtonsSection from "../components/ButtonsSection";

function ResultPage() {
  const location = useLocation();
  const response = location.state?.data;
  const data = response?.data || [];

  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  const handleSort = (key) => {
    if (key === "Ticker" || key === "S.No") return;

    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    const sortedArray = [...sortedData].sort((a, b) => {
      const aValue = parseFloat(a[key].replace(/,/g, "")) || a[key];
      const bValue = parseFloat(b[key].replace(/,/g, "")) || b[key];

      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(sortedData.length / resultsPerPage);
  const displayedData = sortedData.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const getPaginationRange = () => {
    const range = [];
    const maxPagesToShow = 4;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    if (startPage <= 2) {
      startPage = 1;
      endPage = Math.min(totalPages, maxPagesToShow);
    }
  
    if (endPage >= totalPages - 1) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }
  
    if (startPage > 1) {
      range.push(1);
      if (startPage > 2) range.push("...");
    }
  
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) range.push("...");
      range.push(totalPages);
    }
  
    return range;
};


  const handleResultsPerPageChange = (value) => {
    setResultsPerPage(value);
    setCurrentPage(1);
  };

  const [query, setQuery] = useState("");

  return (
    <div className="main-div">
      <div className="results-container">
        <h2>Query Results</h2>
        <div className="action-buttons">
          <button className="button">Save This Query</button>
          <button className="button">Export</button>
          <button className="button">Edit Columns</button>
          <button className="button">Industry</button>
        </div>

        <div className="results-info">
          <p>{sortedData.length} results found: Showing page {currentPage} of {totalPages}</p>
        </div>

        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>S.No</th>
                {Object.keys(displayedData[0] || {}).map((key) => (
                  <th key={key} onClick={() => handleSort(key)}>
                    {key}
                    {sortConfig.key === key ? (sortConfig.direction === "ascending" ? " ▲" : " ▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * resultsPerPage + index + 1}</td>
                  {Object.values(item).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              &lt;
            </button>
            {getPaginationRange().map((page, idx) =>
              page === "..." ? (
                <span key={idx} className="ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "active" : ""}
                >
                  {page}
                </button>
              )
            )}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>

          <div className="results-per-page">
            <span>Results per page: </span>
            {[10, 25, 50].map((value) => (
              <button
                key={value}
                onClick={() => handleResultsPerPageChange(value)}
                className={resultsPerPage === value ? "active" : ""}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="main-container">
          <div className="container">
            <h3>Search query</h3>
            <h5>You can customize the query below:</h5>
            <SearchQuery query={query} setQuery={setQuery} />
            <CheckboxSection />
            <ButtonsSection query={query} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
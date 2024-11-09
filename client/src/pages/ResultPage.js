import React, { useState } from "react";
import styles from "./ResultPage.module.css";
import { useLocation } from "react-router-dom";
import SearchQuery from "../components/SearchQuery";
import CheckboxSection from "../components/CheckboxSection";
import ButtonsSection from "../components/ButtonsSection";
import editLogo from "../assets/images/edit.svg";
import exportLogo from "../assets/images/export.svg";
import filterLogo from "../assets/images/filter.svg";
import cloudLogo from "../assets/images/cloud.svg";
import Footer from "../components/Footer";

function ResultPage() {
  const location = useLocation();
  const response = location.state?.data;
  const data = response?.data || [];

  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [query, setQuery] = useState("");

  const handleSort = (key) => {
    if (key === "Ticker" || key === "S.No") return;

    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
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

  return (
    <div className={styles.mainDiv}>
      <div className={styles.resultContainer}>
        <div className={styles.headerContainer}>
          <h1>Query Results</h1>
          <div className={styles.actionButtons}>
            <button className={`${styles.button} ${styles.saveQuery}`}>
              <img src={cloudLogo} alt="save" className={styles.buttonIcon} />
              SAVE THIS QUERY
            </button>
            <div className={styles.buttonDivTwo}>
              <button className={`${styles.button} ${styles.secondary}`}>
                <img src={filterLogo} alt="filter" className={styles.buttonIcon} />
                INDUSTRY
              </button>
              <button className={`${styles.button} ${styles.secondary}`}>
                <img src={exportLogo} alt="export" className={styles.buttonIcon} />
                EXPORT
              </button>
              <button className={`${styles.button} ${styles.secondary}`}>
                <img src={editLogo} alt="edit" className={styles.buttonIcon} />
                EDIT COLUMNS
              </button>
            </div>
          </div>
        </div>

        <div className={styles.resultsInfo}>
          <p>
            {sortedData.length} results found: Showing page {currentPage} of{" "}
            {totalPages}
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.resultsTable}>
            <thead>
              <tr>
                <th>S.No</th>
                {Object.keys(displayedData[0] || {}).map((key) => (
                  <th key={key} onClick={() => handleSort(key)}>
                    {key}
                    {sortConfig.key === key
                      ? sortConfig.direction === "ascending"
                        ? " ▲"
                        : " ▼"
                      : ""}
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

        <div className={styles.paginationContainer}>
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {getPaginationRange().map((page, idx) =>
              page === "..." ? (
                <span key={idx} className={styles.ellipsis}>...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? styles.active : ""}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>

          <div className={styles.resultsPerPage}>
            <span>Results per page: </span>
            {[10, 25, 50].map((value) => (
              <button
                key={value}
                onClick={() => handleResultsPerPageChange(value)}
                className={resultsPerPage === value ? styles.active : ""}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <h2>Search query</h2>
            <h5>You can customize the query below:</h5>
            <SearchQuery query={query} setQuery={setQuery} />
            <CheckboxSection />
            <ButtonsSection query={query} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ResultPage;

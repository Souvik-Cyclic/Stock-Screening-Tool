import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ButtonsSection.css";

function ButtonsSection({ query }) {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080/filter";
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleRunQuery = async () => {
    if (!query.trim()) {
      showNotification("Please fill the query field.");
      return;
    }
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (response.status === 400) {
        showNotification("Unknown word: " + query);
        return;
      }

      const resultData = await response.json();
      navigate("/results", { state: { data: resultData, refresh: new Date().getTime() } });
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      showNotification("The backend is currently down. Please try again in 15 seconds.");
    }
  };

  return (
    <div className="button-container">
      {notification && <div className="notify">{notification}</div>}
      <button className="run-query-btn" onClick={handleRunQuery}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.5 2.5L12.5 8L3.5 13.5V2.5Z" fill="white" />
        </svg>
        RUN THIS QUERY
      </button>
      <button className="show-ratios-btn">
        <svg
          width="16"
          height="16"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.95137 3C7.53466 3 7.00572 4.75542 8 5.57453V10.1716C8 10.4368 7.89464 10.6911 7.70711 10.8787L2.87868 15.7071C2.31607 16.2697 2 17.0328 2 17.8284V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V17.8284C22 17.0328 21.6839 16.2697 21.1213 15.7071L16.2929 10.8787C16.1054 10.6911 16 10.4368 16 10.1716V5.57453C16.9943 4.75542 16.4653 3 15.0486 3H8.95137ZM16.5858 14H7.41421L9.12132 12.2929C9.68393 11.7303 10 10.9672 10 10.1716V5.2847C10 5.18797 9.99045 5.0927 9.97203 5H14.028C14.0096 5.0927 14 5.18797 14 5.2847V10.1716C14 10.9672 14.3161 11.7303 14.8787 12.2929L16.5858 14Z"
            fill="#323232"
          />
        </svg>
        <span className="show-ratios-text">SHOW ALL RATIOS</span>
      </button>
    </div>
  );
}

export default ButtonsSection;

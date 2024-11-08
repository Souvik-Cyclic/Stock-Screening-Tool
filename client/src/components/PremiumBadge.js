import React from "react";
import "../styles/PremiumBadge.css";

function PremiumBadge() {
  return (
    <div className="premium-badge">
      <svg
        className="premium-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <span>Premium feature</span>
    </div>
  );
}

export default PremiumBadge;

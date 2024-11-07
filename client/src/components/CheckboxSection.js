import React from 'react';
import '../styles/CheckboxSection.css';

function CheckboxSection() {
  return (
    <div className="checkbox-container">
      <input type="checkbox" id="sep-results" />
      <label htmlFor="sep-results">Only companies with Sep 2024 results</label>
    </div>
  );
}

export default CheckboxSection;

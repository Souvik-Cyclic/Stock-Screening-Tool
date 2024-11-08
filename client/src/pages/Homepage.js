import React, { useState } from "react";
import "./Homepage.css";
import Navbar from "../components/Navbar";
import SearchQuery from "../components/SearchQuery";
import CheckboxSection from "../components/CheckboxSection";
import ButtonsSection from "../components/ButtonsSection";
import BackLink from "../components/Backlink";

function Homepage() {
  const [query, setQuery] = useState("");

  return (
    <div className="homepage">
      <Navbar />
      <div className="main-container">
        <div className="container">
          <h3>Create a Search Query</h3>
          <SearchQuery query={query} setQuery={setQuery} />
          <CheckboxSection />
          <ButtonsSection query={query} />
        </div>
        <BackLink />
      </div>
    </div>
  );
}

export default Homepage;
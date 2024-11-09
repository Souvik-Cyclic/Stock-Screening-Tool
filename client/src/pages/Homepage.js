import React, { useState } from "react";
import styles from "./Homepage.module.css";
import SearchQuery from "../components/SearchQuery";
import CheckboxSection from "../components/CheckboxSection";
import ButtonsSection from "../components/ButtonsSection";
import BackLink from "../components/Backlink";

function Homepage() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.homepage}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
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
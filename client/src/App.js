import "./App.css";
import Navbar from "./components/Navbar";
import SearchQuery from "./components/SearchQuery";
import CheckboxSection from "./components/CheckboxSection";
import ButtonsSection from "./components/ButtonsSection";
import BackLink from "./components/Backlink";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <div className="container">
          <h1>Create a Search Query</h1>
          <SearchQuery />
          <CheckboxSection />
          <ButtonsSection />
        </div>
        <BackLink />
      </div>
    </div>
  );
}

export default App;
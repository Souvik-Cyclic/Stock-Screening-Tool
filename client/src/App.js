import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import ResultPage from "./pages/ResultPage";
import Navbar from "../src/components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
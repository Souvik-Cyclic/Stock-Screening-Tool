import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import ResultPage from "./pages/ResultPage";
import Navbar from "../src/components/Navbar";

function App() {
  useEffect(()=>{
    const apiHealthEndpoint = process.env.REACT_APP_API_HEALTH_ENDPOINT || "http://localhost:8080/";

    const triggerApi = async() => {
      try{
        const response = await fetch(apiHealthEndpoint, {
          method: 'GET',
        });
        if (response.ok) {
          console.log('API triggered successfully');
        } else {
          console.error('API trigger failed', response.statusText);
        }
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };
    triggerApi();
  }, []);
  
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
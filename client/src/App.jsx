
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SuccessStories from "./pages/SuccessStories";
import "./App.css";
import TechNews from "./pages/TechNews";

function App() {
  return (
    <Router>
      <TechNews />
    </Router>
  );
}

export default App;

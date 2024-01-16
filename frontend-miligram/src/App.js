import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Auth from "./pages/auth/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./pages/postOverview/Posts";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

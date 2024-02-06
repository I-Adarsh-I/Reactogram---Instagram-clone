import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Auth from "./pages/auth/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./pages/postOverview/Posts";
import ProfilePage from "./pages/profile/ProfilePage";
import Register from "../src/pages/auth/Register";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

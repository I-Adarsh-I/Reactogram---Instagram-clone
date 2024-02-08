import Navbar from "./components/navbar/Navbar";
import './App.css'
import Auth from "./pages/auth/Auth";
import Posts from "./pages/postOverview/Posts";
import Register from "../src/pages/auth/Register";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const LazyPosts = React.lazy(() => import("./pages/postOverview/Posts"));
const LazyProfilePage = React.lazy(() => import("./pages/profile/ProfilePage"));

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />

          {/* Lazy load the Posts component */}
          <Route
            path="/posts"
            element={
              <Suspense
                fallback={
                  <div className="spinner-grow text-primary loading " role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                }
              >
                <LazyPosts />
              </Suspense>
            }
          />

          {/* Lazy load the ProfilePage component */}
          <Route
            path="/profile"
            element={
              <Suspense
                fallback={
                  <div className="spinner-grow text-primary loading " role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                }
              >
                <LazyProfilePage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

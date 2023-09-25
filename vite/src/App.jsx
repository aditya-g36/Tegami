import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import signup from "./pages/signup";
import Profile from "./pages/profile";

import Layout from "./utils/layout";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PostProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route Component={Layout} path="/">
                  <Route Component={HomePage} path="" exact />
                  <Route path="/profile/:userId" element={<Profile />} />
                </Route>
              </Route>
              <Route Component={LoginPage} path="/login" />
              <Route Component={signup} path="/signup" />
            </Routes>
          </PostProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

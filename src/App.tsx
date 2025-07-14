import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
// import Dashboard from "./component/dashboard";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-500 to-slate-800
 text-gray-900">

      <Router>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
          />
          {/* <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          /> */}
          {/* Optionally, add a NotFound route */}
          <Route path="*" element={<h2 className="p-6 text-xl">404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

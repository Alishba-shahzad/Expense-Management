import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./component/dashboard";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // 🔁 New loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setCheckingAuth(false); // ✅ Auth check complete
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-500 to-slate-800 text-gray-900">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/login" /> : <Signup />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          {/* Default route: redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Not Found route */}
          <Route path="*" element={<h2 className="p-6 text-white text-xl">404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

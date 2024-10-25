import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword'; // Ensure the file name is correct
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard'; 
import { useSelector } from 'react-redux';

// ProtectedRoute component checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root path to Dashboard, protected by authentication */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Login route: if authenticated, redirect to dashboard */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        
        {/* Signup route: if authenticated, redirect to dashboard */}
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        
        {/* Forgot password route is accessible to all users */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard route, protected by authentication */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Basic 404 page for undefined routes */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserHome from './components/UserHome';
import { useContext } from 'react';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
};

const App = () => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>}
          />
          <Route
            path="/"
            element={<PrivateRoute><UserHome /></PrivateRoute>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  </GoogleOAuthProvider>
);

export default App;

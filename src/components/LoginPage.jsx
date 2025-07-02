import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import "./login.css"; // Assuming you have a CSS file for styling


const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          const userData = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
            token: credentialResponse.credential,
            isAdmin: decoded.email === 'athul_b210880ee@nitc.ac.in',
          };
          login(userData);
          navigate(userData.isAdmin ? '/admin' : '/');
        }}
        onError={() => {
          alert('Login Failed');
        }}
      />
    </div>
  );
};

export default LoginPage;

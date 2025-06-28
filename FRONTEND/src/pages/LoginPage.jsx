import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(credentials);
      navigate('/profile');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} />
        </div>
        <div className="mb-6">
          <Input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
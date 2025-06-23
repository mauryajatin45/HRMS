// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import 

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email.endsWith('@shivaurica.com')) {
      setError('Only @shivaurica.com emails are allowed');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    // Check credentials
    if (email === 'admin@shivaurica.com' && password === 'admin') {
      navigate('/admin/dashboard');
    } else if (email === 'hr@shivaurica.com' && password === 'hr') {
      navigate('/hr/dashboard');
    } else if (email === 'employee@shivaurica.com' && password === 'employee') {
      navigate('/employee/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700">
        <title>
            Login - Shivaurica
        </title>
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-700">Shivaurica</h1>
          <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Company Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="name@shivaurica.com"
              />
            </div>
            <button
              onClick={() => validateEmail() && setStep(2)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 cursor-pointer"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer transition duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Use company-provided credentials</p>
          <p className="mt-2">© 2025 Shivaurica. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
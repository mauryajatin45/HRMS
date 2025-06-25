import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [step, setStep] = useState(1);
  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = () => {
    const fullEmail = emailPrefix + "@shivaurica.com";
    if (!fullEmail.endsWith("@shivaurica.com")) {
      setError("Only @shivaurica.com emails are allowed");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent form reload
    console.log("🔄 Submitting login...");

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
      console.log("🌐 API URL:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailPrefix + "@shivaurica.com",
          password,
        }),
      });

      const data = await res.json();
      console.log("✅ Response received:", res.status, data);

      if (!res.ok) {
        setError(data.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      const user = jwtDecode(data.token);
      localStorage.setItem("userId", user.id);

      if (data.role === "admin") window.location.assign("/admin/dashboard");
      else if (data.role === "hr") window.location.assign("/hr/dashboard");
      else window.location.assign("/employee/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 px-4">
      <title>Login - Shivaurica</title>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-700">Shivaurica</h1>
          <p className="text-gray-600 mt-2">
            Enter your credentials to continue
          </p>
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
              <div className="flex">
                <input
                  type="text"
                  value={emailPrefix}
                  onChange={(e) => setEmailPrefix(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (validateEmail()) setStep(2);
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email prefix"
                  required
                />
                <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-gray-600 select-none">
                  @shivaurica.com
                </span>
              </div>
            </div>
            <button
              type="button"
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
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
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
      </form>
    </div>
  );
};

export default Login;

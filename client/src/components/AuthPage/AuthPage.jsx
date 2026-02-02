import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    // Simulate network delay for better UX (optional, remove in prod if not needed)
    // await new Promise(resolve => setTimeout(resolve, 800));

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.status) {
        alert(isLogin ? "Login Successful!" : "Account Created Successfully!");
        console.log("User Data:", data.user);
      } else {
        setErrorMessage(data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="auth-subtitle">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Join us and Grind Again'}
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="error-msg">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Name Input (Signup Only) - Slide In Animation */}
          {!isLogin && (
            <div className="input-container slide-in-up">
              <User className="input-icon" size={20} />
              <input
                className="auth-input"
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          {/* Email Input */}
          <div className="input-container">
            <Mail className="input-icon" size={20} />
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-container">
            <Lock className="input-icon" size={20} />
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            {isLogin && <a href="#" className="forgot-link">Forgot password?</a>}
          </div>

          {/* Primary Button */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={20} />
                Processing...
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="auth-footer">
          <p className="auth-text">
            {isLogin ? "Don't have an account?" : "Already hava an account?"}
            <button
              type="button"
              className="toggle-link"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrorMessage("");
                setFormData({ name: "", email: "", password: "" });
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
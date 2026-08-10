import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/signup.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/api/auth/signin", {
        email: email.trim().toLowerCase(),
        password,
      });

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Login flag
      localStorage.setItem(
        "freshcartLoggedIn",
        "true"
      );

      // Update Header immediately
      window.dispatchEvent(new Event("login"));

      // Redirect home
      navigate("/");
    } catch (err) {
      console.error("Sign in error:", err);

      if (err.response) {
        console.error(
          "Backend response:",
          err.response.data
        );

        console.error(
          "Status:",
          err.response.status
        );
      }

      setError(
        err.response?.data?.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        {/* LOGO */}
        <div className="auth-logo">
          <span>🛒</span>
          <span>FreshCart</span>
        </div>

        <h2>Welcome Back</h2>

        <p className="auth-subtitle">
          Sign in to continue with your FreshCart account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <p className="auth-switch-link">
          Don't have an account?

          <Link to="/signup">
            {" "}
            Create account
          </Link>
        </p>

      </div>
    </section>
  );
};

export default SignIn;
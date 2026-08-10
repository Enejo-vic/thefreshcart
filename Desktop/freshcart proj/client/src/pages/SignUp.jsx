import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/signup.css";

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = useState(
    location.pathname === "/login" ? "signin" : "signup"
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // =========================
  // INPUT CHANGES
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SAVE LOGIN SESSION
  // =========================

  const saveUserSession = (data) => {
    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "freshcartLoggedIn",
      "true"
    );

    // Update Header immediately
    window.dispatchEvent(new Event("login"));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // =========================
    // FRONTEND VALIDATION
    // =========================

    if (mode === "signup") {
      if (!formData.name.trim()) {
        setError("Please enter your full name");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    setLoading(true);

    try {
      // =========================
      // SIGN UP
      // =========================

      if (mode === "signup") {
        const res = await api.post("/api/auth/signup", {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        saveUserSession(res.data);

        navigate("/");

        return;
      }

      // =========================
      // SIGN IN
      // =========================

      if (mode === "signin") {
        const res = await api.post("/api/auth/signin", {
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        });

        saveUserSession(res.data);

        navigate("/");
      }
    } catch (err) {
      console.error("Authentication error:", err);

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
          "Unable to connect to FreshCart. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SWITCH SIGNUP / SIGNIN
  // =========================

  const switchMode = (newMode) => {
    setMode(newMode);

    setError("");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        {/* LOGO */}
        <div className="auth-logo">
          <span>🛒</span>
          <span>FreshCart</span>
        </div>

        {/* TABS */}
        <div className="auth-tabs">

          <button
            type="button"
            className={
              mode === "signin"
                ? "auth-tab active"
                : "auth-tab"
            }
            onClick={() => switchMode("signin")}
          >
            Sign In
          </button>

          <button
            type="button"
            className={
              mode === "signup"
                ? "auth-tab active"
                : "auth-tab"
            }
            onClick={() => switchMode("signup")}
          >
            Sign Up
          </button>

        </div>

        {/* TITLE */}
        <h2>
          {mode === "signup"
            ? "Create Account"
            : "Welcome Back"}
        </h2>

        <p className="auth-subtitle">
          {mode === "signup"
            ? "Create your FreshCart account to start shopping."
            : "Sign in to continue with your FreshCart account."}
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete={
              mode === "signup"
                ? "new-password"
                : "current-password"
            }
            required
          />

          {mode === "signup" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? mode === "signup"
                ? "Creating account..."
                : "Signing in..."
              : mode === "signup"
                ? "Create Account"
                : "Sign In"}
          </button>

        </form>

        {/* SWITCH ACCOUNT MODE */}
        <p className="auth-switch-link">

          {mode === "signup"
            ? "Already have an account?"
            : "New to FreshCart?"}

          <Link
            to={
              mode === "signup"
                ? "/login"
                : "/signup"
            }
            onClick={() =>
              switchMode(
                mode === "signup"
                  ? "signin"
                  : "signup"
              )
            }
          >
            {mode === "signup"
              ? " Sign in"
              : " Create account"}
          </Link>

        </p>

      </div>
    </section>
  );
}
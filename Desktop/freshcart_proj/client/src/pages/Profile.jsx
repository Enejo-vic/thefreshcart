import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    deliveryInstructions: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================
     LOAD PROFILE
  ========================================= */

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          city: res.data.city || "",
          province: res.data.province || "",
          postalCode: res.data.postalCode || "",
          deliveryInstructions:
            res.data.deliveryInstructions || "",
        });
      } catch (err) {
        console.error("Profile error:", err);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("freshcartLoggedIn");

          window.dispatchEvent(new Event("login"));

          navigate("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
     SAVE PROFILE
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await api.put(
        "/api/profile",
        {
          name: profile.name.trim(),
          phone: profile.phone.trim(),
          address: profile.address.trim(),
          city: profile.city.trim(),
          province: profile.province,
          postalCode: profile.postalCode
            .trim()
            .toUpperCase(),
          deliveryInstructions:
            profile.deliveryInstructions.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        res.data.message || "Profile updated successfully"
      );

      // Keep local profile data synced with server response
      if (res.data.user) {
        setProfile((prev) => ({
          ...prev,
          ...res.data.user,
        }));

        // Update header user information
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        window.dispatchEvent(new Event("login"));
      }
    } catch (err) {
      console.error("Profile update error:", err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("freshcartLoggedIn");

        window.dispatchEvent(new Event("login"));

        navigate("/login");
        return;
      }

      setError(
        err.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        Loading your profile...
      </div>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">

        {/* PROFILE HEADER */}
        <div className="profile-heading">
          <div className="profile-avatar">
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <h1>My Profile</h1>

            <p>
              Manage your FreshCart account and delivery
              information.
            </p>
          </div>
        </div>

        {/* PROFILE CARD */}
        <form
          className="profile-card"
          onSubmit={handleSubmit}
        >
          <div className="profile-section-heading">
            <h2>Personal Information</h2>

            <p>Update your account information.</p>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label htmlFor="profile-name">
                Full Name
              </label>

              <input
                id="profile-name"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-email">
                Email Address
              </label>

              <input
                id="profile-email"
                type="email"
                value={profile.email}
                autoComplete="email"
                disabled
              />

              <small>
                Email cannot be changed here.
              </small>
            </div>

            <div className="profile-field">
              <label htmlFor="profile-phone">
                Phone Number
              </label>

              <input
                id="profile-phone"
                type="tel"
                name="phone"
                placeholder="e.g. 905-555-0123"
                value={profile.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-section-heading">
            <h2>Delivery Address</h2>

            <p>
              Used when placing FreshCart orders.
            </p>
          </div>

          <div className="profile-grid">
            <div className="profile-field full-width">
              <label htmlFor="profile-address">
                Street Address
              </label>

              <input
                id="profile-address"
                type="text"
                name="address"
                placeholder="123 Main Street"
                value={profile.address}
                onChange={handleChange}
                autoComplete="street-address"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-city">
                City
              </label>

              <input
                id="profile-city"
                type="text"
                name="city"
                placeholder="Toronto"
                value={profile.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
            </div>

            <div className="profile-field">
              <label htmlFor="profile-province">
                Province
              </label>

              <select
                id="profile-province"
                name="province"
                value={profile.province}
                onChange={handleChange}
                autoComplete="address-level1"
              >
                <option value="">
                  Select province
                </option>

                <option value="ON">Ontario</option>
                <option value="BC">
                  British Columbia
                </option>
                <option value="AB">Alberta</option>
                <option value="QC">Quebec</option>
                <option value="MB">Manitoba</option>
                <option value="SK">
                  Saskatchewan
                </option>
                <option value="NS">
                  Nova Scotia
                </option>
                <option value="NB">
                  New Brunswick
                </option>
                <option value="NL">
                  Newfoundland and Labrador
                </option>
                <option value="PE">
                  Prince Edward Island
                </option>
              </select>
            </div>

            <div className="profile-field">
              <label htmlFor="profile-postal">
                Postal Code
              </label>

              <input
                id="profile-postal"
                type="text"
                name="postalCode"
                placeholder="A1A 1A1"
                value={profile.postalCode}
                onChange={handleChange}
                autoComplete="postal-code"
              />
            </div>

            <div className="profile-field full-width">
              <label htmlFor="profile-instructions">
                Delivery Instructions
              </label>

              <textarea
                id="profile-instructions"
                name="deliveryInstructions"
                rows="4"
                placeholder="Apartment number, buzzer code, delivery notes..."
                value={profile.deliveryInstructions}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className="profile-error">
              {error}
            </p>
          )}

          {success && (
            <p className="profile-success">
              {success}
            </p>
          )}

          <div className="profile-actions">
            <button
              type="submit"
              className="profile-save-btn"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
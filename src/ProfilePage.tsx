import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  updateUserProfile,
  getCurrentUser,
  type User,
  type UpdateUserProfileRequest,
} from "./api";
import Button from "./Button";
import { useLanguage } from "./LanguageContext";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UpdateUserProfileRequest>({
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setFormData({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
        if (err instanceof Error && err.message.includes("Unauthorized")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateUserProfile(formData);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        setSuccess("Profile updated successfully");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-message">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Profile Settings</h1>
          <p className="profile-subtitle">Update your personal information</p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{user.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Balance:</span>
              <span className="info-value">${user.balance.toFixed(2)}</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                {t.firstName || "First Name"}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder={t.firstName || "First Name"}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                {t.lastName || "Last Name"}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder={t.lastName || "Last Name"}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";
import "./Profile.css"; // CSS file for styling

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const data = await getProfile(token); // Fetch profile using the token
        setProfile(data);
        console.log("Profile data fetched successfully:", data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError(err.message || "An error occurred");
        localStorage.removeItem("token"); // Clear invalid token
        setTimeout(() => navigate("/login"), 3000); // Redirect user to login
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading)
    return (
      <div className="profile-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="profile-container">
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="profile-container">
      <h2 className="profile-header">Your Profile</h2>
      {profile ? (
        <div className="profile-details">
          <p>
            <span className="profile-label">Name:</span> {profile.name}
          </p>
          <p>
            <span className="profile-label">Email:</span> {profile.email}
          </p>
        </div>
      ) : (
        <p className="no-data-text">No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;

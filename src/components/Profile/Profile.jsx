import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  auth,
  firestore,
  updateDoc,
  updateProfile,
  serverTimestamp,
} from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = auth;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        setDisplayName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        fetchRegistrationDate(currentUser.uid);
        console.log("Name:", currentUser.displayName);
      }
    };
    fetchUserData();
  }, [currentUser]);

  const fetchRegistrationDate = async (uid) => {
    try {
      const docRef = doc(firestore, "Users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setRegistrationDate(userData.registrationDate || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(currentUser, {
        name: displayName,
        email: email,
      });

      const userRef = doc(firestore, "Users", currentUser.uid);
      await updateDoc(userRef, {
        name: displayName,
        email: email,
      });
      console.log(displayName, email);

      toast.success("Profile updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="profile__title">Profile</h3>

      <p className="reg-date">Registration Date: {registrationDate}</p>
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="profile-btn" type="submit">
          Update Profile
        </button>
      </form>

      <div className="logout-wrapper">
        <button className="profile-btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

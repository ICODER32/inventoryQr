import React, { useState } from "react";
import "./UserCard.css";
import { Button } from "react-bootstrap";
import axios from "axios";

const UserCard = ({
  image,
  firstName,
  lastName,
  email,
  employer,
  status,
  lastLogin,
  getUser,
}) => {
  const user_id = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "q1s4yqgc"); // replace with your upload preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlwwbb8tv/image/upload", // replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      updateImage(data.secure_url);
    } catch (err) {
      alert(err);
    }
  };

  const updateImage = async (url) => {
    try {
      setLoading(true);
      await axios.post("/api/users/update", { image: url });

      setLoading(false);
      getUser(user_id);
    } catch (error) {
      alert("Not Updated");
    }
  };

  return (
    <>
      {!loading && (
        <div className="user-card">
          <div className="user-card-image">
            <img src={image} alt={firstName} />
          </div>
          <div className="user-card-details">
            <h3>
              {firstName} {lastName}
            </h3>
            <p>{email}</p>
            <p>{employer}</p>
            <p>{status}</p>
            <p>Last login: {lastLogin}</p>
          </div>
          {employer === "Employer" && (
            <>
              {" "}
              <Button>
                Update Pic{" "}
                <input onChange={handleImage} type="file" name="" id="" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserCard;

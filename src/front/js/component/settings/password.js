import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

export const Password = () => {
  const { store, actions } = useContext(Context);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getUser();
  }, [store.token]);

  const updatePassword = async () => {
    if (newPassword === "" || oldPassword === "" || confirmNewPassword === "") {
      setError(true);
      setMessage("Please fill in all fields");
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 4000);
    }

    if (newPassword === confirmNewPassword) {
      try {
        actions.updateUserPassword(oldPassword, newPassword);
        setMessage("Updated password");
        setTimeout(() => {
          setMessage("");
        }, 4000);
      } catch (error) {
        setError(true);
        setTimeout(() => {
          setMessage("");
          setError(false);
        }, 4000);
      }
    } else {
      setMessage("Passwords dont match");
      setError(true);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 4000);
    }
  };

  return (
    <section className="tab">
      <div className="p-1">
        <h5 className="mb-4">Change Your Password</h5>
        <div className="d-flex flex-column gap-3 w-25">
          <label>
            Old Password
            <input
              type="text"
              placeholder="Enter old password"
              className="p-1"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>
          <label>
            New Password
            <input
              placeholder="Enter new password "
              className="p-1"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="text"
              placeholder="Confirm password"
              className="p-1"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </label>
        </div>
      </div>
      {message && (
        <p
          className={`p-2 mt-3 rounded w-25 ${
            error ? "bg-danger" : "bg-success"
          } text-white`}
        >
          {message}
        </p>
      )}

      <button
        style={{
          backgroundColor: "#00AA93",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 15px 10px 15px",
          cursor: "pointer",
          marginTop: "30px",
        }}
        onClick={() => updatePassword()}
      >
        Update Info
      </button>
    </section>
  );
};

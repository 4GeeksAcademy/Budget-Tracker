import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export const PersonalInfo = () => {
  const { store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getUser();
  }, [store.token]);

  const updateInfo = () => {
    actions.updateUserInfo(firstName, lastName, email);
  };

  const deleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      actions.deleteUserAccount();
      console.log("Account deleted");
      actions.logout();
      navigate("/");
    }
  };

  return (
    <section className="tab">
      <div className="pt-1">
        <h5 className="mb-4">Update Your Information</h5>
        <div className="d-flex gap-4">
          <label className="d-flex flex-column">
            First Name
            <input
              type="text"
              placeholder={
                store.user_info
                  ? store.user_info.firstName
                  : "No information found"
              }
              className="p-1"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label className="d-flex flex-column">
            Last Name
            <input
              placeholder={
                store.user_info
                  ? store.user_info.lastName
                  : "No information found"
              }
              className="p-1"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="pt-3">
        <div className="d-flex gap-4">
          <label className="d-flex flex-column">
            Email Address
            <input
              type="text"
              placeholder={
                store.user_info ? store.user_info.email : "No information found"
              }
              className="p-1"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="d-flex gap-2 pt-5">
        <button
          style={{
            backgroundColor: "#00AA93",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px 10px 15px",
            cursor: "pointer",
          }}
          onClick={() => updateInfo()}
        >
          Update Info
        </button>
        <button
          style={{
            backgroundColor: "#E04A80",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px 10px 15px",
            cursor: "pointer",
          }}
          onClick={() => deleteAccount()}
        >
          Delete Account
        </button>
      </div>
    </section>
  );
};

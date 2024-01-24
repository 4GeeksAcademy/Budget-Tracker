import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

export const PersonalInfo = () => {
  const { store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getUser();
  }, [store.token]);

  const updateInfo = () => {
    actions.updateUserInfo(firstName, lastName, email);
  };

  return (
    <section className="tab">
      <div className="pt-2">
        <h3>Personal Details</h3>
        <div className="d-flex gap-5">
          <label className="d-flex flex-column">
            First Name
            <input
              type="text"
              placeholder={
                store.user_info
                  ? store.user_info.firstName
                  : "No information found"
              }
              className="rounded border-dark p-1"
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
              className="rounded border-dark  p-1"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="pt-5">
        <h3>Contact Details</h3>
        <div className="d-flex gap-5">
          <label className="d-flex flex-column">
            Email Address
            <input
              type="text"
              placeholder={
                store.user_info ? store.user_info.email : "No information found"
              }
              className="rounded border-dark p-1"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button
        className="p-1 mt-5 rounded bg-primary text-white"
        onClick={() => updateInfo()}
      >
        Update Info
      </button>
    </section>
  );
};

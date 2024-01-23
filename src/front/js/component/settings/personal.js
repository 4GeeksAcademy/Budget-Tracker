import React from "react";

export const PersonalInfo = () => {
  const user = {
    firstName: "Joe",
    lastName: "Doe",
    email: "Joes@gmail.com",
    address: "Joes Home",
    number: "321-021-2332",
  };

  return (
    <section>
      <div className="pt-2">
        <h3>Personal Details</h3>
        <div className="d-flex gap-5">
          <label className="d-flex flex-column">
            First Name
            <input type="text" placeholder={user.firstName} />
          </label>
          <label className="d-flex flex-column">
            Last Name
            <input placeholder={user.lastName} />
          </label>
        </div>
      </div>
      <div className="pt-5">
        <h3>Contact Details</h3>
        <div className="d-flex gap-5">
          <label className="d-flex flex-column">
            Email Address
            <input type="text" placeholder={user.address} />
          </label>
          <label className="d-flex flex-column">
            Phone
            <input placeholder={user.number} />
          </label>
        </div>
      </div>
      <button className="p-1 mt-5 rounded bg-primary text-white">
        Update Info
      </button>
    </section>
  );
};

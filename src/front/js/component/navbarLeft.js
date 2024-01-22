import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, useNavigate } from "react-router-dom";

function NavbarLeft() {
  const { store, actions } = useContext(Context);
  const handleLogout = () => {
    actions.logout();
  };

  return (
    <>
      <NavLink to="/dashboard">
        {({ isActive }) => (
          <div
            className={isActive ? "dashboard-item-active" : "dashboard-item"}
          >
            <i className="fa-solid fa-chart-simple icon"></i>
            <span>Dashboard</span>
          </div>
        )}
      </NavLink>
      <div className="dashboard-item">
        <i className="fa-solid fa-sack-dollar icon"></i>
        <span>Budgets</span>
      </div>
      <NavLink to="/accounts">
        {({ isActive }) => (
          <div
            className={isActive ? "dashboard-item-active" : "dashboard-item"}
          >
            <i className="fa-solid fa-landmark icon"></i>
            <span>Accounts</span>
          </div>
        )}
      </NavLink>
      <NavLink to="/settings">
        {({ isActive }) => (
          <div
            className={isActive ? "dashboard-item-active" : "dashboard-item"}
          >
            <i className="fa-solid fa-gear icon"></i>
            <span>Settings</span>
          </div>
        )}
      </NavLink>
      <hr className="hr-nav" />
      <div className="dashboard-item">
        <i className="fa-solid fa-question icon"></i>
        <span>Support</span>
      </div>
      <NavLink to="/login" onClick={handleLogout}>
        <div className="dashboard-item">
          <i className="fa-solid fa-right-from-bracket icon"></i>
          <span>Logout</span>
        </div>
      </NavLink>
    </>
  );
}

export default NavbarLeft;

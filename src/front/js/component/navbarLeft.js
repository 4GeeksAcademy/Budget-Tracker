import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../img/BudgetAppLogo6.png";

function NavbarLeft() {
  const { store, actions } = useContext(Context);
	const handleLogout = () => {
		actions.logout();

    const toggleDarkMode = () => {
      actions.toggleDarkMode();
  };

  };


  return (
    <>
      <div className="logo"><img src={logo} width={125} alt='Logo' /></div>
      <NavLink to="/dashboard">
      {({ isActive }) => (
        <div className={isActive ? 'dashboard-item-active' : 'dashboard-item'}>
          <i className="fa-solid fa-chart-simple icon"></i>
          <span>Dashboard</span>
        </div>
      )}
      </NavLink>
      <NavLink to="/budgets">
      {({ isActive }) => (
      <div className={isActive ? 'dashboard-item-active' : 'dashboard-item'}>
      <i className="fa-solid fa-sack-dollar icon"></i>
      <span>Budgets</span>
      </div>
      )}
      </NavLink>
      <NavLink to="/accounts">
      {({ isActive }) => (
        <div className={isActive ? 'dashboard-item-active' : 'dashboard-item'}>
            <i className="fa-solid fa-landmark icon"></i>
            <span>Accounts</span>
        </div>
      )}
      </NavLink>
      <NavLink to="/settings">
      {({ isActive }) => (
        <div className={isActive ? 'dashboard-item-active' : 'dashboard-item'}>
          <i className="fa-solid fa-gear icon"></i>
            <span>Settings</span>
        </div>
      )}
      </NavLink>
      <div className='dashboard-item' onClick={actions.toggleDarkMode}>
        {/* Conditional rendering based on isDarkMode */}
        {store.isDarkMode ? (
          <>
            <i className="fa-solid fa-sun icon"></i> {/* Sun icon for light mode */}
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <i className="fa-solid fa-moon icon"></i> {/* Moon icon for dark mode */}
            <span>Dark Mode</span>
          </>
        )}
      </div>
      <hr className='hr-nav'/>
      <NavLink to="/feedback">
  {({ isActive }) => (
    <div className={isActive ? 'dashboard-item-active' : 'dashboard-item'}>
      <i className="fa-solid fa-comment-dots icon"></i>
      <span>Feedback</span>
    </div>
  )}
</NavLink>
      <NavLink to="/login" onClick={handleLogout}>
        <div className='dashboard-item'>
          <i className="fa-solid fa-right-from-bracket icon"></i>
          <span>Logout</span>
        </div>
      </NavLink>
     
    </>
  );
}

export default NavbarLeft;
import React from 'react';

function NavbarLeft() {
  return (
    <>
      
      <div className='dashboard-item-active'>
      <i className="fa-solid fa-chart-simple icon"></i><span>Dashboard</span>
      </div>
      <div className='dashboard-item'>
      <i className="fa-solid fa-sack-dollar icon"></i>
      <span>Budget</span>
      </div>
      <div className='dashboard-item'>
          <i className="fa-solid fa-gear icon"></i>
          <span>Settings</span>
      </div>
      <hr className='hr-nav'/>
      <div className='dashboard-item'>
          <i className="fa-solid fa-question icon"></i>
          <span>Support</span>
      </div>
      <div className='dashboard-item'>
      <i className="fa-solid fa-right-from-bracket icon"></i>
            <span>Logout</span>
      </div>
     
    </>
  );
}

export default NavbarLeft;
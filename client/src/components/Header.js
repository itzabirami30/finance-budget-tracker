import React from 'react';
import './Header.css';

function Header({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="header">
      <div className="header-content">
        <h1>💰 Finance Budget Tracker</h1>
        <div className="header-right">
          <span className="user-name">Welcome, {user.name}</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

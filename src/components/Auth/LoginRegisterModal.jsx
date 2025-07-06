import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const LoginRegisterModal = ({ onClose }) => {
  const [tab, setTab] = useState('login');

  return (
    <div className="popup">
      <div className="popup-inner">
        <button
          type="button"
          className="popup-close"
          onClick={onClose}
          aria-label="Close"
        >×</button>
        <div className="popup-tabs">
          <button
            className={tab === 'login' ? 'popup-tab active' : 'popup-tab'}
            onClick={() => setTab('login')}
          >Login</button>
          <button
            className={tab === 'register' ? 'popup-tab active' : 'popup-tab'}
            onClick={() => setTab('register')}
          >Register</button>
        </div>
        <div className="popup-content">
          {tab === 'login' ? <LoginPage isModal /> : <RegisterPage isModal />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;

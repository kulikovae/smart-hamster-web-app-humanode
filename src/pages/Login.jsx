import React from 'react';
import welcomeImg from '../assets/img/logo.svg';

const Login = ({ refer }) => {
  return (
    <div ref={refer} className="welcome">
      <div>
        <img src={welcomeImg} className="welcome-logo" alt="logo" />
      </div>
      <div className="footer-copyright text-center py-3 text-bottom">
        <h3 className="text-white">Powerd by LoyaniX©</h3>
      </div>
    </div>
  );
};

export default Login;

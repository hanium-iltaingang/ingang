import React from "react";
import "./register.css";
import logo from "./main_logo.png";
import eyeIcon from "./eye.png"; 

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <img
          src={logo}
          alt="Logo"
          className="register-logo"
        />
        <form className="register-form">
          <input
            type="text"
            placeholder="이름"
            className="register-input"
          />
          <input
            type="date"
            placeholder="생년월일"
            className="register-input"
          />
          <input
            type="email"
            placeholder="이메일"
            className="register-input"
          />
          
          <div className="password-container">
            <input
              type="password"
              placeholder="Password"
              className="register-input password-input"
            />
            <img
              src={eyeIcon}
              alt="Show Password"
              className="eye-icon"
            />
          </div>

          <button type="submit" className="register-button">
            회원가입
          </button>
        </form>

        <div className="social-login-text">or</div>
        <div className="social-login">
          <div className="social-buttons">
            <button className="google-button">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
            </button>
            <button className="meta-button">
              <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Meta" />
            </button>
            <button className="apple-button">
              <img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="Apple" />
            </button>
          </div>
        </div>

        <div className="login-link">
          이미 계정이 있으신가요? <a href="/">로그인</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

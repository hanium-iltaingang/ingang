import React from "react";
import { Link } from "react-router-dom"; 
import "./login.css";
import logo from "./main_logo.png";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src={logo}
          alt="Logo"
          className="main-logo"  
        />
        <form className="login-form">
          <input
            type="text"
            placeholder="아이디"
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="login-input"
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="social-login">
          <div className="social-login-text">소셜로그인</div>
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

        <div className="login-options">
          <a href="/">아이디 찾기</a> | <a href="/">비밀번호 찾기</a> | 
          <Link to="/register" className="register-link">회원가입</Link> {/* Link 컴포넌트를 사용하여 register 페이지로 이동 */}
        </div>
      </div>
    </div>
  );
};

export default Login;

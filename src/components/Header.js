//Header.js

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 로그인 또는 회원가입 페이지에서는 헤더를 렌더링하지 않음
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) return null;

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo-and-search">
          <Link to="/">
            <img src={logo} alt="사이트 로고" className="logo" /> 
          </Link>
          <input type="text" className="search-bar" placeholder="검색" />
        </div>
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')}>로그인</button>
          <button onClick={() => navigate('/register')}>회원가입</button>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/my-courses">MY 강의</Link></li> 
          <li><Link to="/learning-notes">학습노트</Link></li> 
          <li><Link to="/quiz">퀴즈</Link></li> 
          <li><Link to="/my-page">마이페이지</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

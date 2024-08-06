import React from 'react';
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo-and-search">
          <img src={logo} alt="사이트 로고" className="logo" /> 
          <input type="text" className="search-bar" placeholder="검색" />
        </div>
        <div className="auth-buttons">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </div>
      <nav>
        <ul>
          <li>MY 강의</li>
          <li>학습노트</li>
          <li>퀴즈</li>
          <li>로드맵</li>
          <li>커뮤니티</li>
          <li>마이페이지</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

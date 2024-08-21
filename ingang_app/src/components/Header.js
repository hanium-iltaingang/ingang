// Header.js
// 웹사이트의 상단 헤더(로고, 검색창, 로그인/회원가입, 메뉴)를 구성
import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo-and-search">
          <Link to="/"> {/* 로고를 클릭했을 때 홈 페이지로 이동하도록 Link 추가 */}
            <img src={logo} alt="사이트 로고" className="logo" /> 
          </Link>
          <input type="text" className="search-bar" placeholder="검색" />
        </div>
        <div className="auth-buttons">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/my-courses">MY 강의</Link></li> 
          <li><Link to="/learning-notes">학습노트</Link></li> 
          <li><Link to="/quiz">퀴즈</Link></li> 
          <li><Link to="/road-map">로드맵</Link></li> 
          <li><Link to="/community">커뮤니티</Link></li> 
          <li><Link to="/my-page">마이페이지</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

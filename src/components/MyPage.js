// MyPage.js
import React from 'react';
import './MyPage.css'; 
import profileImage from '../assets/mypage_1.png';

const MyPage = () => {
  return (
    <div className="mypage-container">
      <aside className="sidebar">
        <div className="profile">
          <img
            className="profile-image" src={profileImage} alt="프로필 이미지" 
          />
          <h2>사용자명</h2>
          <h4>▷프로필 사진 변경</h4>
        </div>
      </aside>
      <section className="content">
        <div className="section-header">
          <h2>내 프로필</h2>
        </div>
        <div className="settings-group">
          <div className="setting-item">
            <span>생년월일</span>
            <h4 style={{ color: '#d2d2d2'}}>이곳에 설정한 생년월일 표시</h4>
            <button>변경</button>
          </div>
          <div className="setting-item">
            <span>비밀번호</span>
            <h4 style={{ color: '#d2d2d2'}}>이곳에 설정한 비밀번호 표시</h4>
            <button>변경</button>
          </div>
          <div className="setting-item">
            <span>이메일</span>
            <h4 style={{ color: '#d2d2d2'}}>이곳에 설정한 이메일 표시</h4>
            <button>변경</button>
          </div>
          <div className="setting-item">
            <span>주소</span>
            <h4 style={{ color: '#d2d2d2'}}>이곳에 설정한 주소 표시</h4>
            <button>변경</button>
          </div>
        </div>
        <div className="settings-group">
          <h2>프로모션 정보수신 동의</h2>
          <div className="setting-item">
            <span>휴대전화</span>
            <div className="toggle">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="setting-item">
            <span>이메일</span>
            <div className="toggle">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPage;

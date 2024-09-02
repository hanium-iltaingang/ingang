// LearningNotes.js
// 학습노트 페이지
import React from 'react';
import './LearningNotes.css';

const MyPage = () => {
  return (
    <div className="my-page">
      <h1 className="page-title">노트 보관함</h1>
      <div className="folders-section">
        <h2>폴더</h2>
        <div className="folder-list">
          <div className="folder new-folder">
            <span className="plus-icon"> +</span>
            <p>새 폴더</p>
          </div>
          <div className="folder">
            <img src="https://via.placeholder.com/100x100?text=Java" alt="Java Folder" />
            <p>Java</p>
          </div>
          <div className="folder">
            <img src="https://via.placeholder.com/100x100?text=Python" alt="Python Folder" />
            <p>Python</p>
          </div>
        </div>
      </div>
      <div className="notes-section">
        <h2>노트</h2>
        <div className="note-list">
          <div className="note new-note">
            <span className="plus-icon">+</span>
            <p>새 노트</p>
          </div>
          <div className="note">
            <h3>제목</h3>
            <p>노트 내용은 여기에 표시</p>
            <p className="note-date">2024. 06. 25</p>
          </div>
          <div className="note">
            <h3>노트 1</h3>
            <p>노트 내용은 여기에 표시</p>
            <img src="https://via.placeholder.com/100x100?text=Note+Image" alt="Note 1" />
            <p className="note-date">2024. 06. 23</p>
          </div>
          <div className="note">
            <h3>노트 2</h3>
            <p>노트 내용은 여기에 표시</p>
            <img src="https://via.placeholder.com/100x100?text=Note+Image" alt="Note 2" />
            <p className="note-date">2024. 06. 21</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;


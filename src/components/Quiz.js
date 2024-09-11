// Quiz.js
import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="quiz-page-container">
      <div className="quiz-sidebar">
        <div className="course-info">
          <img src={require('../assets/course-thumbnail.png')} alt="Course Thumbnail" className="course-thumbnail" />
          <h3>[피그마] 상세페이지 사용법 강의</h3>
        </div>
        <ul className="sidebar-menu">
          <li>채점</li>
          <li>학습노트</li>
          <li>오답노트</li>
        </ul>
        <div className="question-types">
          <p>문제 유형</p>
          <ul>
            <li>객관식</li>
            <li>주관식</li>
            <li>OX 퀴즈</li>
            <li>빈칸 채우기</li>
          </ul>
        </div>
      </div>
      <div className="quiz-container">
        <div className="quiz-header">
          <ul className="quiz-steps">
            {Array.from({ length: 10 }, (_, i) => (
              <li key={i} className={i === 9 ? 'active' : ''}>{i + 1}</li>
            ))}
          </ul>
          <div className="timer">16:35</div>
        </div>
        <div className="quiz-content-centered">
          <h2 className="quiz-question-title">10. 피그마는 어떤 종류의 소프트웨어인가요?</h2>
          <ul className="options-list-centered">
            <li
              className={selectedOption === 1 ? 'selected option-item' : 'option-item'}
              onClick={() => handleOptionClick(1)}
            >
              1. 그래픽 디자인 소프트웨어
            </li>
            <li
              className={selectedOption === 2 ? 'selected option-item' : 'option-item'}
              onClick={() => handleOptionClick(2)}
            >
              2. 음악 제작 소프트웨어
            </li>
            <li
              className={selectedOption === 3 ? 'option-item selected' : 'option-item'}
              onClick={() => handleOptionClick(3)}
            >
              3. 3D 모델링 소프트웨어
            </li>
            <li
              className={selectedOption === 4 ? 'option-item selected' : 'option-item'}
              onClick={() => handleOptionClick(4)}
            >
              4. 벡터 그래픽 편집 소프트웨어
            </li>
            <li
              className={selectedOption === 5 ? 'option-item selected' : 'option-item'}
              onClick={() => handleOptionClick(5)}
            >
              5. 비디오 편집 소프트웨어
            </li>
          </ul>
          <div className="quiz-navigation">
            <button className="nav-button">&#9664;</button>
            <button className="submit-button-centered">퀴즈 제출하기</button>
            <button className="nav-button">&#9654;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

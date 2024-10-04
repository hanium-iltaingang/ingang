//Quiz.js
import React, { useEffect, useState } from 'react';
import './Quiz.css';

const Quiz = ({ videoId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(600); 
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); 

  const questions = [
    '피그마는 어떤 종류의 소프트웨어인가요?',
    '다음 중 웹 개발 언어는 무엇인가요?',
    '자바스크립트에서 배열을 선언할 때 사용하는 키워드는?',
    'HTML의 약자는 무엇인가요?',
    'CSS는 무엇의 약자인가요?',
    'HTTP의 기본 포트 번호는?',
    'React에서 상태 관리를 위해 사용하는 훅은?',
    '다음 중 NoSQL 데이터베이스는 무엇인가요?',
    'Git에서 변경 사항을 기록할 때 사용하는 명령어는?',
    '다음 중 CSS 레이아웃 관련 속성은 무엇인가요?'
  ];

  const optionsList = [
    ['그래픽 디자인 소프트웨어', '음악 제작 소프트웨어', '3D 모델링 소프트웨어', '벡터 그래픽 편집 소프트웨어', '비디오 편집 소프트웨어'],
    ['Python', 'Java', 'HTML', 'CSS', 'Ruby'],
    ['const', 'let', 'var', 'array', 'define'],
    ['Hyper Text Markup Language', 'Hyper Transfer Mail Language', 'Hyper Transfer Make Language', 'Home Text Make Language', 'Hyper Text Makeup Language'],
    ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Code Style Sheets', 'Color Style Sheets'],
    ['80', '21', '443', '8080', '90'],
    ['useState', 'useEffect', 'useContext', 'useReducer', 'useFetch'],
    ['MySQL', 'Oracle', 'PostgreSQL', 'MongoDB', 'SQL Server'],
    ['git log', 'git commit', 'git init', 'git add', 'git merge'],
    ['position', 'flex', 'float', 'box-shadow', 'transition']
  ];

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api"; 
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        onYouTubeIframeAPIReady();
      }
    };

    const onYouTubeIframeAPIReady = () => {
      if (window.YT && window.YT.Player) {
        new window.YT.Player('youtube-player', {
          videoId: videoId,
          events: {
            onReady: (event) => {
              console.log("YouTube Player가 준비되었습니다.");
            },
          },
        });
      } else {
        console.error("YouTube IFrame API가 로드되지 않았습니다.");
      }
    };

    loadYouTubeAPI();

    return () => {
      if (window.YT && window.YT.Player) {
        window.YT.Player.prototype.destroy();
      }
    };
  }, [videoId]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    setSelectedOption(null);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
    setSelectedOption(null);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    setSelectedOption(null);
  };

  // 타이머 기능
  useEffect(() => {
    let intervalId;
    if (isTimerActive) {
      intervalId = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isTimerActive]);

  useEffect(() => {
    if (timer === 0) {
      alert('타임이 종료되었습니다.');
      setIsTimerActive(false);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="quiz-page-container">
      <div className="quiz-sidebar">
        <div className="course-info">
          <iframe
            id="youtube-player"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="youtube-video-quiz"
          ></iframe>
        </div>
        <ul className="sidebar-menu">
          <li>채점하기</li>
          <li>학습노트</li>
          <li>오답노트</li>
        </ul>
      </div>
      <div className="quiz-container">
        <div className="quiz-header">
          <ul className="quiz-steps">
            {questions.map((_, i) => (
              <li key={i} className={i === currentQuestion ? 'active' : ''} onClick={() => handleQuestionClick(i)}>
                {i + 1}
              </li>
            ))}
          </ul>
          <div className="timer">{formatTime(timer)}</div>
          <button className="start-button" onClick={() => setIsTimerActive((prev) => !prev)}>
            {isTimerActive ? '정지' : '시작'}
          </button>
        </div>
        <div className="quiz-content-centered">
          <h2 className="quiz-question-title">
            {currentQuestion + 1}. {questions[currentQuestion]}
          </h2>
          <ul className="options-list-centered">
            {optionsList[currentQuestion].map((option, index) => (
              <li key={index} className={selectedOption === index ? 'selected option-item' : 'option-item'} onClick={() => handleOptionClick(index)}>
                {index + 1}. {option}
              </li>
            ))}
          </ul>
          <div className="quiz-navigation">
            <button className="nav-button" onClick={handlePrevQuestion}>&#9664;</button>
            <button className="submit-button-centered">퀴즈 제출하기</button>
            <button className="nav-button" onClick={handleNextQuestion}>&#9654;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

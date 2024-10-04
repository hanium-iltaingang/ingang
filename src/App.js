// App.js
// 핵심 컴포넌트를 설정하고 라우팅을 관리 - 기본 구조와 페이지 간 내비게이션을 정의
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 라우팅 관련 컴포넌트를 가져옴
import './App.css'; // css 가져오기
import Header from './components/Header'; 
import Login from './components/Login';
import Register from './components/Register';
import Banner from './components/Banner';
import CourseCard from './components/CourseCard';
import MyCourses from './components/MyCourses'; 
import LearningNotes from './components/LearningNotes';
import Quiz from './components/Quiz';
import MyPage from './components/MyPage';
const courseData = [ // 강의 카드에 표시할 강의 정보를 담고 있는 배열
  { title: "[웹개발/고급] 스프링부트 이용자를 위한 클라우드 입문(AWS, Docker)", image: require('./assets/event_01.png'), price: "25,300원"},
  { title: "[데이터/고급] Spark과 SparkML을 이용한 모델 훈련", image: require('./assets/event_02.png'), price: "29,700원"},
  { title: "[IT일반/중급] Python 기초 실습 코스", image: require('./assets/event_03.png'), price: "55,000원"},
];

// 애플리케이션의 구조를 정의
function App() { 
  return (
    <Router>
      <div className="App">
        <Header /> 
        <Routes> 
          <Route path="/" element={<Banner />} />
          <Route 
            path="/courses" 
            element={
              <div className="course-list">
                {courseData.map((course, index) => (
                  <CourseCard key={index} title={course.title} image={course.image} price={course.price} />
                ))}
              </div>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-courses" element={<MyCourses videoId="ntP6RmaG7gk" />} /> 
          <Route path="/learning-notes" element={<LearningNotes />} />
          <Route path="/quiz" element={<Quiz videoId="ntP6RmaG7gk" />} />
          <Route path="/my-page" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

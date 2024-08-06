import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import CourseCard from './components/CourseCard';

// courseData를 이곳으로 옮겨 필요에 따라 다른 컴포넌트에서 사용할 수 있습니다.
const courseData = [
  { title: "[웹개발/고급] 스프링부트 이용자를 위한 클라우드 입문(AWS, Docker)", image: require('./assets/event_01.png'), price: "25,300원" },
  { title: "[데이터/고급] Spark과 SparkML을 이용한 모델 훈련", image: require('./assets/event_02.png'), price: "29,700원" },
  { title: "[IT일반/중급] Python 기초 실습 코스", image: require('./assets/event_03.png'), price: "55,000원" },
];

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

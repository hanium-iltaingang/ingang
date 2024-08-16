//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';
import CourseCard from './components/CourseCard';
import MyCourses from './components/MyCourses'; 

const courseData = [
  { title: "[웹개발/고급] 스프링부트 이용자를 위한 클라우드 입문(AWS, Docker)", image: require('./assets/event_01.png'), price: "25,300원", videoId: "oq1bttg9VhM" },
  { title: "[데이터/고급] Spark과 SparkML을 이용한 모델 훈련", image: require('./assets/event_02.png'), price: "29,700원", videoId: "다른_영상_ID_1" },
  { title: "[IT일반/중급] Python 기초 실습 코스", image: require('./assets/event_03.png'), price: "55,000원", videoId: "다른_영상_ID_2" },
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
          <Route path="/my-courses" element={<MyCourses videoId="X1BXdhgUeUs" />} /> {/* videoId를 추가하여 전달 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

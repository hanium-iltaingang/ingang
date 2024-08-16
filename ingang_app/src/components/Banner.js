//Banner.js
import React from 'react';
import CourseCard from './CourseCard';
import awsImage from '../assets/event_01.png';
import sparkImage from '../assets/event_02.png';
import pythonImage from '../assets/event_03.png';

const courseData = [
  { title: "[웹개발/고급] 스프링부트 이용자를 위한 클라우드 입문(AWS, Docker)", image: awsImage, price: "25,300원" },
  { title: "[데이터/고급] Spark과 SparkML을 이용한 모델 훈련", image: sparkImage, price: "29,700원" },
  { title: "[IT일반/중급] Python 기초 실습 코스", image: pythonImage, price: "55,000원" },
];

const Banner = () => {
  return (
    <div className="banner">
      <h1 className="section-title">편리한 인터넷 강의 학습, 일타인강 서비스로!</h1>
      <p className="section-description">
        <span>Python, Java, SQL, Figma...</span><br />
        어떤 강의든 자동 자막 생성 기능으로 편리하게<br />
        타임라인, 구간 반복 재생 기능으로 효율적인 학습을!
      </p>
      <div className="course-cards">
        {courseData.map((course, index) => (
          <CourseCard key={index} title={course.title} image={course.image} price={course.price} />
        ))}
      </div>
    </div>
  );
};

export default Banner;

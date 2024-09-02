// CourseCard.js
// 특정 강의를 카드 형태로 표시 - 메인 페이지에 사용
import React from 'react';
import './CourseCard.css';

const CourseCard = ({ title, image, price }) => { // 강의 카드의 내용을 구성
  return (
    <div className="course-card">
      <img src={image} alt={`강의 이미지: ${title}`} />
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  );
};

export default CourseCard;

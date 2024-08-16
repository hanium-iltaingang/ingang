//CourseCard.js
import React from 'react';

const CourseCard = ({ title, image, price }) => {
  return (
    <div className="course-card">
      <img src={image} alt={`강의 이미지: ${title}`} />
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  );
};

export default CourseCard;

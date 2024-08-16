// MyCourses.js
import React from 'react';

const MyCourses = ({ videoId }) => {
  return (
    <div className="my-courses-container">
      <div className="video-wrapper">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?si=WEWv1y5QUSGuSCvP`} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          className="youtube-video" 
        ></iframe>
      </div>
      <div className="course-notes">
        <h1>학습 노트 부분</h1>
        {/* 노트 내용 추가 가능(아직 입력 구현 X) */}
      </div>
    </div>
  );
};

export default MyCourses;

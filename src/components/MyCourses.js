// MyCourses.js
// MY 강의 페이지 - 비디오 구현
import React from 'react';

const MyCourses = ({ videoId }) => {
  return (
    <div className="my-courses-container">
      <div className="video-wrapper">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?si=WEWv1y5QUSGuSCvP`} // YouTube 비디오의 URL
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // 비디오 플레이어의 기능을 제어
          referrerPolicy="strict-origin-when-cross-origin" // 보안
          allowFullScreen // 전체 화면 모드
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

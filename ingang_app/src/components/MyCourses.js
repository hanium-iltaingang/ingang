import React from 'react';

const MyCourses = () => {
  return (
    <div className="my-courses-container">
      <div className="video-wrapper">
        <iframe
          className="youtube-video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/영상_ID" // 이 부분에 유튜브 영상 ID가 들어가야 됨
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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

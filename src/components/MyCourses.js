//MyCourses.js
import React, { useEffect, useState } from 'react';
import './MyCourses.css';
import { startSTT, fetchNotes } from '../api/api';  // 수정된 api.js 파일에서 함수 import

const MyCourses = ({ videoId }) => {
  const [notesContent, setNotesContent] = useState('');

  useEffect(() => {
    // 학습 노트 콘텐츠를 가져오는 함수
    const fetchNotesContent = async () => {
      try {
        const data = await fetchNotes();  // API 요청을 통해 학습 노트를 가져옴
        setNotesContent(data);
      } catch (error) {
        console.error('텍스트 파일을 가져오는 중 오류 발생:', error);
      }
    };

    // YouTube 영상이 재생될 때 백엔드에 STT 요청을 보냄
    const handleVideoPlay = async () => {
      try {
        const data = await startSTT(videoId);  // API 요청을 통해 STT 작업을 시작
        if (data.success) {
          console.log('STT 작업 시작됨');
          fetchNotesContent(); // 자막 파일을 다시 가져와서 화면에 업데이트
        } else {
          console.error('STT 작업 실패:', data.message);
        }
      } catch (error) {
        console.error('STT 요청 중 오류 발생:', error);
      }
    };

    const iframe = document.querySelector('.youtube-video');
    if (iframe) {
      iframe.addEventListener('play', handleVideoPlay);
    }

    fetchNotesContent();  // 컴포넌트가 마운트될 때 학습 노트를 가져옴

    return () => {
      if (iframe) {
        iframe.removeEventListener('play', handleVideoPlay);
      }
    };
  }, [videoId]);

  return (
    <div className="my-courses-container">
      <div className="video-wrapper">
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen 
          className="youtube-video" 
        ></iframe>
      </div>
      <div className="course-notes">
        <h1>학습 노트</h1>
        <p>{notesContent}</p>
      </div>
    </div>
  );
};

export default MyCourses;

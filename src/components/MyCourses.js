import React, { useEffect, useState } from 'react';
import './MyCourses.css';
import { startSTT, createNote, editNote } from '../api/api'; // API 함수 import

const MyCourses = ({ videoId }) => {
  const [selectedNote, setSelectedNote] = useState(null); // 선택된 노트 상태
  const [editing, setEditing] = useState(false); // 편집 모드 상태
  const [title, setTitle] = useState(''); // 노트 제목 상태
  const [contents, setContents] = useState(''); // 노트 내용 상태 (content -> contents)
  const [message, setMessage] = useState(''); // 일반 메시지 상태
  const [messageColor, setMessageColor] = useState(''); // 메시지 색상 상태

  // 고정된 작성자 (하드코딩된 값)
  const author = "Default Author";

  // 메시지 상태 초기화 및 3초 후 자동 제거
  const displayMessage = (text, color) => {
    setMessage(text);
    setMessageColor(color);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  useEffect(() => {
    // YouTube 영상이 재생될 때 백엔드에 STT 요청을 보냄
    const handleVideoPlay = async () => {
      try {
        const data = await startSTT(videoId); // API 요청을 통해 STT 작업을 시작
        if (data.success) {
          console.log('STT 작업 시작됨');
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

    return () => {
      if (iframe) {
        iframe.removeEventListener('play', handleVideoPlay);
      }
    };
  }, [videoId]);

  // STT 요청 중 오류 처리
  const handleFetchSTT = async () => {
    try {
      const data = await startSTT(videoId);
      if (data.success) {
        console.log('STT 작업 시작됨');
      } else {
        console.error('STT 작업 실패:', data.message);
      }
    } catch (error) {
      console.error('STT 요청 중 오류 발생:', error);
    }
  };

  // 노트 저장 핸들러 (편집 모드에 따라 생성 또는 수정)
  const handleSaveNote = async () => {
    try {
      if (editing && selectedNote) {
        await editNote(selectedNote.id, title, contents, author); // 기존 노트 수정
        displayMessage('노트가 성공적으로 수정되었습니다.', 'blue');
      } else {
        await createNote(0, title, contents, author); // 새로운 노트 생성
        displayMessage('노트가 성공적으로 저장되었습니다.', 'blue');
      }

      setSelectedNote(null); // 선택된 노트 초기화
      setTitle(''); // 노트 제목 초기화
      setContents(''); // 노트 내용 초기화
    } catch (error) {
      console.error('노트 저장 중 오류 발생:', error);
      displayMessage('노트 저장에 실패했습니다.', 'red');
    }
  };

  // 노트 초기화 핸들러
  const handleResetNotes = () => {
    setSelectedNote(null); // 선택된 노트 초기화
    setEditing(false); // 편집 모드 종료
    setTitle(''); // 노트 제목 초기화
    setContents(''); // 노트 내용 초기화 (content -> contents)
  };

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
        <div className="course-notes-header">
          <h1 onClick={handleResetNotes}>학습 노트</h1>
          {message && (
            <span style={{ color: messageColor, marginLeft: '10px', fontSize: '14px' }}>
              {message}
            </span>
          )}
          <button className="new-note-btn" onClick={() => setEditing(true)}>새 노트 작성</button>
        </div>

        {editing ? (
          <div className="edit-notes">
            <label>
              <input 
                type="text" 
                placeholder="노트 제목을 입력하세요" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </label>
            <label>
              <textarea
                className="note-content" 
                placeholder="노트 내용을 입력하세요" 
                value={contents} 
                onChange={(e) => setContents(e.target.value)} 
              />
            </label>
            <button onClick={handleSaveNote}>저장</button>
          </div>
        ) : (
          <div className="fetch-stt-container">
            <button onClick={handleFetchSTT}>STT 파일 불러오기</button>
          </div>
        )}
      </div>
    </div>
  );  
};

export default MyCourses;

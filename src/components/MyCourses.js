import React, { useEffect, useState } from 'react';
import './MyCourses.css';
import { startSTT, createNote, editNote } from '../api/api'; // API 함수 import

const MyCourses = ({ videoId }) => {
  const [selectedNote, setSelectedNote] = useState(null); // 선택된 노트 상태
  const [editing, setEditing] = useState(false); // 편집 모드 상태
  const [title, setTitle] = useState(''); // 노트 제목 상태
  const [contents, setContents] = useState(''); // 노트 내용 상태
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
    const loadYouTubeAPI = () => {
      // YouTube API가 로드되었는지 확인
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    };

    const onYouTubeIframeAPIReady = () => {
      new window.YT.Player('youtube-player', {
        events: {
          // YouTube 동영상 관련 이벤트 정의가 필요 없다
        },
      });
    };

    // YouTube IFrame API가 로드되면 실행할 콜백 설정
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    loadYouTubeAPI();

    return () => {
      if (window.YT && window.YT.Player) {
        window.YT.Player.prototype.destroy();
      }
    };
  }, [videoId]);

  // STT 작업을 수동으로 실행하는 함수
  const handleSTT = async () => {
    try {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      console.log('STT 요청에 사용되는 유튜브 URL:', youtubeUrl);
      const data = await startSTT(youtubeUrl); // STT 요청
      if (data.transcription) {
        displayMessage('STT 작업이 성공적으로 완료되었습니다.', 'blue');
        console.log('STT 변환 결과:', data.transcription); // 변환된 텍스트를 콘솔에 출력
      } else {
        displayMessage('STT 작업 실패: ' + data.message, 'red');
        console.error('STT 작업 실패:', data.message); // 실패 메시지 처리
      }
    } catch (error) {
      displayMessage('STT 요청 중 오류 발생: ' + error.message, 'red');
      console.error('STT 요청 중 오류 발생:', error); // 오류 발생 시 로그 출력
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
    setContents(''); // 노트 내용 초기화
  };

  return (
    <div className="my-courses-container">
      <div className="video-wrapper">
        <iframe
          id="youtube-player"
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
            <button onClick={handleSTT}>STT 변환 시작하기</button> {/* 수동으로 STT 실행 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

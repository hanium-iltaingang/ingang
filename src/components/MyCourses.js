import React, { useEffect, useState } from 'react';
import './MyCourses.css';
import { startSTT, fetchNotes, fetchNote, createNote, editNote } from '../api/api'; // API 함수 import

const MyCourses = ({ videoId }) => {
  const [notes, setNotes] = useState([]); // 노트 목록 상태
  const [selectedNote, setSelectedNote] = useState(null); // 선택된 노트 상태
  const [editing, setEditing] = useState(false); // 편집 모드 상태
  const [title, setTitle] = useState(''); // 노트 제목 상태
  const [content, setContent] = useState(''); // 노트 내용 상태
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가


  // 학습 노트 목록을 가져오는 함수
  const fetchNotesContent = async () => {
    try {
      const data = await fetchNotes(); // API 요청을 통해 학습 노트 목록을 가져옴
      setNotes(data);
    } catch (error) {
      console.error('노트 목록을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // YouTube 영상이 재생될 때 백엔드에 STT 요청을 보냄
    const handleVideoPlay = async () => {
      try {
        const data = await startSTT(videoId); // API 요청을 통해 STT 작업을 시작
        if (data.success) {
          console.log('STT 작업 시작됨');
          fetchNotesContent(); // 노트 목록을 다시 가져와서 화면에 업데이트
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

    fetchNotesContent(); // 컴포넌트가 마운트될 때 학습 노트를 가져옴

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
        await fetchNotesContent();
      } else {
        console.error('STT 작업 실패:', data.message);
        setErrorMessage(data.message); // 오류 메시지 상태 업데이트
      }
    } catch (error) {
      console.error('STT 요청 중 오류 발생:', error);
      setErrorMessage('STT 요청 중 오류가 발생했습니다.'); // 오류 메시지 상태 업데이트
    }
  };

  // 노트 저장 핸들러 (편집 모드에 따라 생성 또는 수정)
  const handleSaveNote = async () => {
    try {
      if (editing && selectedNote) {
        await editNote(selectedNote.id, title, content); // 기존 노트 수정
      } else {
        await createNote(title, content); // 새로운 노트 생성
      }
      setEditing(false); // 편집 모드 종료
      setSelectedNote(null); // 선택된 노트 초기화
      setTitle(''); // 노트 제목 초기화
      setContent(''); // 노트 내용 초기화
      await fetchNotesContent(); // 저장 후 최신 노트 목록 불러오기
    } catch (error) {
      console.error('노트 저장 중 오류 발생:', error);
    }
  };

  // 노트 편집 모드 진입 핸들러
  const handleEditNote = async (noteId) => {
    try {
      const note = await fetchNote(noteId); // 특정 노트를 API 요청을 통해 가져옴
      setSelectedNote(note); // 선택된 노트 설정
      setTitle(note.title); // 노트 제목 설정
      setContent(note.content); // 노트 내용 설정
      setEditing(true); // 편집 모드 활성화
    } catch (error) {
      console.error('노트를 가져오는 중 오류 발생:', error);
    }
  };

  // 노트 초기화 핸들러
  const handleResetNotes = () => {
    setSelectedNote(null); // 선택된 노트 초기화
    setEditing(false); // 편집 모드 종료
    setTitle(''); // 노트 제목 초기화
    setContent(''); // 노트 내용 초기화
    setErrorMessage(''); // 오류 메시지 초기화
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
          {errorMessage && <span style={{ color: 'red', marginLeft: '10px' }}>{errorMessage}</span>} {/* 오류 메시지 표시 */}
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
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
              />
            </label>
            <button onClick={handleSaveNote}>저장</button>
          </div>
        ) : (
          <div className="notes-container">
            <div>
              {notes.map((note) => (
                <div key={note.id} onClick={() => handleEditNote(note.id)}>
                  <h2>{note.title}</h2>
                  <p>{note.content}</p>
                </div>
              ))}
            </div>
            <div className="fetch-stt-container"> {/* STT 버튼을 감싸는 새로운 div */}
              <button onClick={handleFetchSTT}>STT 파일 불러오기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

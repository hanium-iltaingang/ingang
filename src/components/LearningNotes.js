import React, { useEffect, useState } from 'react';
import './LearningNotes.css';
import { fetchNotes, fetchNote } from '../api/api'; // API 함수 import

const LearningNotes = () => {
  const [notes, setNotes] = useState([]); // 노트 목록 상태
  const [selectedNote, setSelectedNote] = useState(null); // 선택된 노트 상태
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태

  // 학습 노트 목록을 가져오는 함수
  const fetchNotesContent = async () => {
    try {
      const data = await fetchNotes(); // API 요청을 통해 학습 노트 목록을 가져옴
      setNotes(data);
    } catch (error) {
      console.error('노트 목록을 가져오는 중 오류 발생:', error);
      setErrorMessage('노트 목록을 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 특정 노트의 내용을 가져오는 함수
  const handleNoteClick = async (noteId) => {
    try {
      const note = await fetchNote(noteId); // 노트 ID로 API 요청을 통해 특정 노트 가져오기
      setSelectedNote(note); // 선택된 노트 상태 업데이트
    } catch (error) {
      console.error('노트 내용을 가져오는 중 오류 발생:', error);
      setErrorMessage('노트 내용을 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchNotesContent(); // 컴포넌트가 마운트될 때 노트 목록을 가져옴
  }, []);

  return (
    <div className="learning-notes-container">
      <h1 className="learning-notes-title">학습 노트 목록</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>} 
      <div className="notes-list">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className={`note-card ${selectedNote?.id === note.id ? 'selected' : ''}`} 
            onClick={() => handleNoteClick(note.id)}
          >
            <h2>{note.title}</h2>
            <p>{note.contents.slice(0, 100)}...</p> {/* 노트 내용 미리보기 (100자까지 표시) */}
            <p className="note-date">{note.date}</p>
          </div>
        ))}
      </div>
      {selectedNote && (
        <div className="note-details">
          <h2>{selectedNote.title}</h2>
          <p>{selectedNote.contents}</p>
          <p><em>작성자: {selectedNote.author}</em></p>
        </div>
      )}
    </div>
  );
};

export default LearningNotes;

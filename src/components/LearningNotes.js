//LearningNotes.js
import React, { useEffect, useState } from 'react';
import './LearningNotes.css';
import { fetchNotes, fetchNote, deleteNote } from '../api/api';

const LearningNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotesContent = async () => {
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error('노트 목록을 가져오는 중 오류 발생:', error);
      setErrorMessage('노트 목록을 가져오는 중 오류가 발생했습니다.');
    }
  };

  const handleNoteClick = async (noteId) => {
    try {
      const note = await fetchNote(noteId);
      setSelectedNote(note);
    } catch (error) {
      console.error('노트 내용을 가져오는 중 오류 발생:', error);
      setErrorMessage('노트 내용을 가져오는 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteNote = async (noteId, e) => {
    e.stopPropagation(); // 삭제 버튼 클릭 시 노트 열림 방지
    try {
      await deleteNote(noteId);
      fetchNotesContent();
    } catch (error) {
      console.error('노트를 삭제하는 중 오류 발생:', error);
      setErrorMessage('노트를 삭제하는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchNotesContent();
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
            <p>{note.contents.slice(0, 100)}...</p>
            <p className="note-date">{note.date}</p>
            <button onClick={(e) => handleDeleteNote(note.id, e)}>삭제</button>
          </div>
        ))}
      </div>
      {selectedNote && (
        <div className="note-details">
          <h2>{selectedNote.title}</h2>
          <p>{selectedNote.contents}</p>
          <p className="note-date">{selectedNote.date}</p>
        </div>
      )}
    </div>
  );
};

export default LearningNotes;

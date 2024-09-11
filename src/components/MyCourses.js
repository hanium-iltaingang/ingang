//MyCourse.js
import React, { useEffect, useState } from 'react';
import './MyCourses.css';
import { startSTT, createNote, editNote } from '../api/api'; 

const MyCourses = ({ videoId }) => {
  const [selectedNote, setSelectedNote] = useState(null); 
  const [editing, setEditing] = useState(false); 
  const [title, setTitle] = useState(''); 
  const [contents, setContents] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [messageColor, setMessageColor] = useState(''); 
  const [timestamps, setTimestamps] = useState([]); 
  const [player, setPlayer] = useState(null); 
  const [timestampSeconds, setTimestampSeconds] = useState([]); 
  const [playerReady, setPlayerReady] = useState(false); 

  const author = "Default Author";

  const displayMessage = (text, color) => {
    setMessage(text);
    setMessageColor(color);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api"; // YouTube API URL
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        onYouTubeIframeAPIReady();
      }
    };

    const onYouTubeIframeAPIReady = () => {
      if (window.YT && window.YT.Player) {
        const ytPlayer = new window.YT.Player('youtube-player', {
          videoId: videoId,
          events: {
            onReady: (event) => {
              setPlayer(event.target); 
              setPlayerReady(true); 
              console.log("YouTube Player가 준비되었습니다.");
            },
          },
        });
      } else {
        console.error("YouTube IFrame API가 로드되지 않았습니다.");
      }
    };

    // 주기적으로 YouTube API 로드 여부 확인
    const checkAPIReady = setInterval(() => {
      if (window.YT && window.YT.Player) {
        onYouTubeIframeAPIReady();
        clearInterval(checkAPIReady);
      }
    }, 100);

    loadYouTubeAPI();

    return () => {
      clearInterval(checkAPIReady);
      if (window.YT && window.YT.Player) {
        window.YT.Player.prototype.destroy();
      }
    };
  }, [videoId]);

  // 타임스탬프를 생성
  const generateTimestamps = () => {
    if (player) {
      const duration = player.getDuration(); 
      console.log('전체 영상 시간:', duration);

      if (duration > 0) {
        const interval = duration / 10; 
        const newTimestamps = [];
        const newTimestampSeconds = [];
        for (let i = 1; i <= 10; i++) {
          const timeInSeconds = Math.floor(interval * i);
          newTimestamps.push(formatTimestamp(timeInSeconds)); 
          newTimestampSeconds.push(timeInSeconds); 
        }

        setTimestamps(newTimestamps); 
        setTimestampSeconds(newTimestampSeconds);
      } else {
        console.error("동영상 시간이 로드되지 않았습니다.");
        displayMessage('동영상 시간이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.', 'red');
      }
    }
  };

  const formatTimestamp = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimestampClick = (timeInSeconds) => {
    if (player) {
      player.seekTo(timeInSeconds);
    }
  };

  // STT 작업 실행(수동)
  const handleSTT = async () => {
    try {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const data = await startSTT(youtubeUrl); // STT 요청
      if (data.transcription) {
        displayMessage('STT 작업이 성공적으로 완료되었습니다.', 'blue');
        console.log('STT 변환 결과:', data.transcription); 
      } else {
        displayMessage('STT 작업 실패: ' + data.message, 'red');
        console.error('STT 작업 실패:', data.message); 
      }
    } catch (error) {
      displayMessage('STT 요청 중 오류 발생: ' + error.message, 'red');
      console.error('STT 요청 중 오류 발생:', error); 
    }
  };

  // 노트 저장
  const handleSaveNote = async () => {
    try {
      if (editing && selectedNote) {
        await editNote(selectedNote.id, title, contents, author); 
        displayMessage('노트가 성공적으로 수정되었습니다.', 'blue');
      } else {
        await createNote(0, title, contents, author); 
        displayMessage('노트가 성공적으로 저장되었습니다.', 'blue');
      }

      setSelectedNote(null); 
      setTitle(''); 
      setContents(''); 
    } catch (error) {
      console.error('노트 저장 중 오류 발생:', error);
      displayMessage('노트 저장에 실패했습니다.', 'red');
    }
  };

  // 노트 초기화 
  const handleResetNotes = () => {
    setSelectedNote(null); 
    setEditing(false); 
    setTitle(''); 
    setContents(''); 
  };

  return (
    <div className="my-courses-container">
      <div className="timestamps-container">
        {timestamps.length > 0 && (
          <>
            <h2 style={{cursor: 'pointer'}}> ▽ 타임라인 </h2>
            <ul>
              {timestamps.map((timestamp, index) => (
                <li key={index} onClick={() => handleTimestampClick(timestampSeconds[index])} style={{cursor: 'pointer'}}>
                  {timestamp}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

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
        <button className="time-stamp--btn" onClick={generateTimestamps} disabled={!playerReady}>
          타임스탬프 생성
        </button>
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
            <button onClick={handleSTT}>STT 변환 시작하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;

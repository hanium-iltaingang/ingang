import axios from './axiosConfig';

// STT 작업을 시작하는 API 요청 함수
export const startSTT = async (youtubeUrl) => {
  try {
    const response = await axios.post('/video/transcribe', null, {
      params: { youtubeUrl }
    });
    return response.data;
  } catch (error) {
    console.error('STT 요청 중 오류 발생:', error);
    throw error;
  }
};

// 학습 노트를 가져오는 API 요청 함수
export const fetchNotes = async () => {
  try {
    const response = await axios.get('/note', { responseType: 'json' });
    return response.data;
  } catch (error) {
    console.error('노트 목록을 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 특정 학습 노트를 가져오는 API 요청 함수 (notesid를 사용)
export const fetchNote = async (notesid) => {
  try {
    const response = await axios.get(`/note/${notesid}`, { responseType: 'json' });
    return response.data;
  } catch (error) {
    console.error('노트를 가져오는 중 오류 발생:', error);
    throw error;
  }
};

// 학습 노트를 생성하는 API 요청 함수
export const createNote = async (notesid, title, contents, author = 'Default Author') => {
  try {
    const response = await axios.post(`/note/${notesid}`, { title, contents, author }); // 필드명을 content -> contents로 수정
    return response.data;
  } catch (error) {
    console.error('노트를 생성하는 중 오류 발생:', error);
    throw error;
  }
};

// 학습 노트를 삭제하는 API 요청 함수 (notesid를 사용)
export const deleteNote = async (notesid) => {
  try {
    const response = await axios.delete(`/note/${notesid}`);
    return response.data;
  } catch (error) {
    console.error('노트를 삭제하는 중 오류 발생:', error);
    throw error;
  }
};


// 학습 노트를 편집하는 API 요청 함수 (notesid를 사용)
export const editNote = async (notesid, title, contents, author = 'Default Author') => {
  try {
    const response = await axios.patch(`/note/${notesid}`, { title, contents, author }); // 필드명을 content -> contents로 수정
    return response.data;
  } catch (error) {
    console.error('노트를 편집하는 중 오류 발생:', error);
    throw error;
  }
};


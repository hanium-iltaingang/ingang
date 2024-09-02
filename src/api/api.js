// src/api/api.js
import axios from './axiosConfig';

// STT 작업을 시작하는 API 요청 함수
export const startSTT = async (youtubeUrl) => {
  try {
    // 서버에 POST 요청을 보내서 STT 작업을 시작
    // youtubeUrl은 쿼리 파라미터로 전달
    const response = await axios.post('/video/transcribe', null, {
      params: { youtubeUrl }  // GET 대신 POST로 변경하고, 쿼리 파라미터로 youtubeUrl을 전달합니다.
    });

    // 서버로부터 받은 응답 데이터를 반환
    return response.data; 
  } catch (error) {
    // 오류가 발생하면 콘솔에 오류 메시지를 출력
    console.error('STT 요청 중 오류 발생:', error);

    // 오류를 다시 던져 호출자 측에서 처리
    throw error;
  }
};

// 학습 노트를 가져오는 API 요청 함수
export const fetchNotes = async () => {
  try {
    // 서버에서 '/stt_test.txt' 파일을 텍스트 형식으로 가져옴
    const response = await axios.get('/stt_test.txt', { responseType: 'text' });

    // 서버로부터 받은 텍스트 데이터를 반환
    return response.data; 
  } catch (error) {
    // 오류가 발생하면 콘솔에 오류 메시지를 출력
    console.error('텍스트 파일을 가져오는 중 오류 발생:', error);

    // 오류를 다시 던져 호출자 측에서 처리
    throw error; 
  }
};

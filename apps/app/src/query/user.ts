import axios from 'axios';
import { API } from './api';
import { axios as AuthAxios } from '../utils/axios.interceptor';
import { useQuery } from 'react-query';
async function loginUser(payload: { email: string; password: string }) {
  try {
    const response = await axios.post(`${API}auth/login`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
}

async function registerUser(payload: { email: string; password: string }) {
  try {
    const response = await axios.post(`${API}auth/register/user`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
}

async function updateQuizRecord(
  payload: { correct: number; incorrect: number },
  quiz_id: string
) {
  try {
    const response = await AuthAxios.post(
      `${API}users/update-quiz-record/${quiz_id}`,
      payload
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
}

async function getUserQuizHistory() {
  try {
    const response = await axios.get(`${API}users/quiz-record`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

const GetUserQuizHistories = () => {
  return useQuery('userquizhistory', getUserQuizHistory);
};

export { loginUser, registerUser, updateQuizRecord, GetUserQuizHistories };

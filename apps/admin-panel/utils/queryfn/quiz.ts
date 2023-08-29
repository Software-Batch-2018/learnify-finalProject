import axios from 'axios';
import { API } from '../api';
import { useQuery } from 'react-query';

export async function AddOrEditQuiz(payload: any, course_id: string) {
  try {
    const response = await axios.post(
      `${API}/quiz/${course_id}`,
      payload
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function GetQuiz( course_id: string) {
  try {
    const response = await axios.get(
      `${API}/quiz/${course_id}`
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}


export const useGetQuiz = (course_id: string) => {
  return useQuery(['quizs', course_id], () => GetQuiz(course_id));
};
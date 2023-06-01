import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getCourseContentAndQuiz(course_id: string) {
  try {
    const response = await axios.get(
      `${API}quiz/${course_id}`
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

export const GetContentAndQuiz =  (course_id: string) => {
  return useQuery('content_quiz', ()=> getCourseContentAndQuiz(course_id));
};

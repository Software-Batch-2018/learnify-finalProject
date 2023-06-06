import axios from 'axios';
import { API } from '../api';

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

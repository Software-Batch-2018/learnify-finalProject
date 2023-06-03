import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getPopularCourses() {
  try {
    const response = await axios.get(`${API}top-courses`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const GetAllPopularCourses = () => {
  return useQuery('popular', getPopularCourses);
};

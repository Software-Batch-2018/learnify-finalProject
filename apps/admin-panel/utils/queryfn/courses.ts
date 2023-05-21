import { useQuery } from 'react-query';
import { axios } from '../axios-inteceptor';

async function getCourses() {
  try {
    const response = await axios.get(
      'http://localhost:3334/api/courses/all/levels'
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

const useGetAllCourses = () => {
  return useQuery('courses', getCourses);
};

export { useGetAllCourses };
import {  useQuery } from 'react-query';
import { axios } from '../axios-inteceptor';
import { API } from '../api';

async function getCourses() {
  try {
    const response = await axios.get(
      `${API}/courses/all/levels`
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

interface AddLevelPayload{
  level_name: string
}

async function AddLevel(payload: AddLevelPayload){
  try {
    const response = await axios.post(
      `${API}/courses/level`,
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

const useGetAllCourses = () => {
  return useQuery('courses', getCourses);
};



export { useGetAllCourses, AddLevel };

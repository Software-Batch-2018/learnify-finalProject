import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../api';

async function getCourseMaterialAndQA(course_id: string) {
  try {
    const response = await axios.get(`${API}/material/all/${course_id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const useGetMaterial = (course_id: string) => {
  return useQuery(['courseMaterial', course_id], () =>
    getCourseMaterialAndQA(course_id)
  );
};

export async function addMaterial(
  payload: { material_link: string },
  course_id: string
) {
  try {
    const response = await axios.post(`${API}/material/${course_id}`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
}

export async function addQa(
  payload: { material_link: string },
  course_id: string
) {
  try {
    const response = await axios.post(
      `${API}/material/qa/${course_id}`,
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

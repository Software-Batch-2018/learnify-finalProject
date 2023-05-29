import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getContents(subject_id: string) {
  try {
    const response = await axios.get(
      `${API}courses/all/content/${subject_id}`
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

export const GetAllContents =  (subject_id: string) => {
  return useQuery('contents', ()=> getContents(subject_id));
};

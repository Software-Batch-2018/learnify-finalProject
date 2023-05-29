import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getSubjects(level_id: string) {
  try {
    const response = await axios.get(
      `${API}courses/all/subjects/${level_id}`
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

export const GetAllSubjects =  (level_id: string) => {
  return useQuery('subjects', ()=> getSubjects(level_id));
};

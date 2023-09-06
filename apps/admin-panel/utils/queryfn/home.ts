import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../api';

async function getallUserCount() {
  try {
    const response = await axios.get(`${API}/user-by-faculty`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const useGetAllUserCount = () => {
  return useQuery('userCount', getallUserCount);
};

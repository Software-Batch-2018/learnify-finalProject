import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getLevels() {
  try {
    const response = await axios.get(
      `${API}courses/all/levels`
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

export const GetAllLevels = () => {
  return useQuery('levels', getLevels);
};

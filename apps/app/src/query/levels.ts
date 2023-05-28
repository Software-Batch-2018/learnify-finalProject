import axios from 'axios';
import { useQuery } from 'react-query';

async function getLevels() {
  try {
    const response = await axios.get(
      'http://192.168.1.66:3334/api/courses/all/levels'
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

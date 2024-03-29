import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getBlogs() {
  try {
    const response = await axios.get(`${API}blogs`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const GetAllBlogs = () => {
  return useQuery('blogs', getBlogs);
};

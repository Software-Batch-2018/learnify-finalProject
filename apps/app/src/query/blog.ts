import axios from 'axios';
import { useQuery } from 'react-query';

async function getBlogs() {
  try {
    const response = await axios.get('http://192.168.1.66:3334/api/blogs');
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

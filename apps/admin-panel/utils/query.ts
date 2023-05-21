import { useQuery } from 'react-query';
import { getBlogs } from './queryfn';

export const useFindAllBlogs = () => {
  return useQuery('blogs', getBlogs);
};

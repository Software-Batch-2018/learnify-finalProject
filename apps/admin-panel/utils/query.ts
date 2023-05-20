import { useMutation, useQuery } from 'react-query';
import { getBlogs } from './queryfn';
import axios from 'axios';

export const useFindAllBlogs = () => {
  return useQuery('blogs', getBlogs);
};

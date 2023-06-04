import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from './api';

async function getAllForumQuestion() {
  try {
    const response = await axios.get(`${API}forum`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const GetAllForumQuestion = () => {
  return useQuery('getAllForumQuestion', getAllForumQuestion);
};

async function getAllForumReplies(forum_id: string) {
  try {
    const response = await axios.get(`${API}forum/${forum_id}`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export const GetAllForumReplies = (forum_id: string) => {
  return useQuery('getAllForumReplies', () => getAllForumReplies(forum_id));
};

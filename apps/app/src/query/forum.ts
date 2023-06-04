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

export async function replyForum(
  payload: { comment: string },
  question_id: string
) {
  try {
    const response = await axios.post(
      `${API}forum/reply/${question_id}`,
      payload
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
}

export async function askQuestion(payload: {
  question: string;
  description: string;
}) {
  try {
    const response = await axios.post(`${API}forum/ask`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
}

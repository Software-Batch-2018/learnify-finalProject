import { API } from './api';
import { axios } from './axios-inteceptor';
async function getBlogs() {
  try {
    const response = await axios.get(`${API}/blogs`);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}
export interface EditPayload {
  id: string;
  payload: {
    title?: string;
    content?: string;
  };
}

export interface CreatePayload {
  title: string;
  content: string;
  blog_img: string;
}
async function createBlogs(payload: CreatePayload) {
  try {
    const response = await axios.post(
      `${API}/blogs`,
      payload
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

async function editBlogs({ id, payload }: EditPayload) {
  try {
    const response = await axios.patch(
      `${API}/blogs/${id}`,
      payload
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

async function deleteBlogs({ id }: { id: string }) {
  try {
    const response = await axios.delete(
      `${API}/blogs/${id}`
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

export { getBlogs, editBlogs, deleteBlogs, createBlogs };

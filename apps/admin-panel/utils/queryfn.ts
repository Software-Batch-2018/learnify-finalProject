import axios from 'axios';

async function getBlogs() {
  const response = await axios.get('http://localhost:3334/api/blogs');
  const data = await response.data;
  return data;
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
  const response = await axios.post(`http://localhost:3334/api/blogs`, payload);
  const data = await response.data;
  console.log(data);
  return data;
}

async function editBlogs({ id, payload }: EditPayload) {
  const response = await axios.patch(
    `http://localhost:3334/api/blogs/${id}`,
    payload
  );
  const data = await response.data;
  return data;
}

async function deleteBlogs({ id }: { id: string }) {
  const response = await axios.delete(`http://localhost:3334/api/blogs/${id}`);
  const data = await response.data;
  return data;
}

export { getBlogs, editBlogs, deleteBlogs, createBlogs };

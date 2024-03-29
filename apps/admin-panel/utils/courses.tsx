import axios from 'axios';
import { API } from './api';

export interface CreateLevelPayload {
  level: string;
  level_img: string;
}

export async function CreateLevel(payload: CreateLevelPayload) {
  try {
    const response = await axios.post(`${API}/courses/level`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export interface CreateSubjectPayload {
  subject_name: string;
  subject_img: string;
  level_id: string;
}

export async function CreateSubject(payload: CreateSubjectPayload) {
  try {
    const response = await axios.post(`${API}/courses/subject`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export interface CreateContenPayload {
  content_title: string;
  title_img: string;
  content: string;
  subject_id: string;
}
export async function CreateContent(payload: CreateContenPayload) {
  try {
    const response = await axios.post(`${API}/courses/content`, payload);
    const data = await response.data;
    return data;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

export async function editCourseContent({ content_id, payload }: any) {
  try {
    const response = await axios.patch(
      `${API}/courses/edit/content/${content_id}`,
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

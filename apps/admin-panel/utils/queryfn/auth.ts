import axios from 'axios';

async function loginUser(payload: { email: string; password: string }) {
  try {
    const response = await axios.post(
      `http://localhost:3334/api/auth/login`,
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

export { loginUser };

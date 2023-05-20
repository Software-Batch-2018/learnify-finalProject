import Cookies from 'js-cookie';
export function GetUserFromToken(): {
  token?: string;
  error?: boolean;
  message?: string;
} {
  try {
    const user = JSON.parse(Cookies.get('user') as string);
    return user;
  } catch (error: any) {
    return {
      error: true,
      message: error.message,
    };
  }
}

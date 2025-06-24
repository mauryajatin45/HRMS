import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const getRole = () => localStorage.getItem('role');

export const getUser = () => {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch {
    return null;
  }
};

export const isAdminLoggedIn = () => getRole() === 'admin' && !!getToken();

export const isHRLoggedIn = () => getRole() === 'hr' && !!getToken();

export const isEmployeeLoggedIn = () => getRole() === 'employee' && !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
};

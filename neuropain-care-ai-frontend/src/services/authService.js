import api from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

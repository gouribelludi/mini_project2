import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitPainAssessment = async (assessmentData) => {
  try {
    const response = await api.post('/pain-assessment', assessmentData);
    console.log
    return response.data;
  } catch (error) {
    console.error('Error submitting pain assessment:', error);
    throw error;
  }
};

export const sendChatMessage = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    console.log('Chat response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export default api;

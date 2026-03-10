import api from './axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAISuggestion = async (fieldType, context) => {
  try {
    const response = await api.post('/ai/suggest', {
      fieldType,
      context
    });
    return response.data.suggestion;
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    throw error;
  }
};

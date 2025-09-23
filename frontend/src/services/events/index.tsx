import api from '../skoobtur';

export const getEvents = async () => {
  const response = await api.get('/attractions');
  return response.data;
};

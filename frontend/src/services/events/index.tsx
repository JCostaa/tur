import api from '../skoobtur';

export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

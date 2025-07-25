
import api from '../skoobtur'

const getProviders = async (type: 'guides' | 'agencies' | 'drivers') => {
  const response = await api.get(`/providers?type=${type}`);
  return response.data;
};

export { getProviders };
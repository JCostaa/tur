import api from './axios';

export const CategoryService = {
  async getAll() {
    const { data } = await api.get('/categories');
    return data;
  },
  async getById(id: number) {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },
  async create(category: { name: string }) {
    const { data } = await api.post('/categories', category);
    return data;
  },
  async update(id: number, category: { name: string }) {
    const { data } = await api.put(`/categories/${id}`, category);
    return data;
  },
  async remove(id: number) {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  },
}; 
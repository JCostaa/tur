import api from './axios';

export interface Banner {
  id: number;
  title: string;
  description?: string;
  link?: string;
  orderIndex: number;
  isActive: boolean;
  imageId?: number;
  image?: {
    id: number;
    filename: string;
    originalName: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface File {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerData {
  title: string;
  description?: string;
  link?: string;
  orderIndex?: number;
  isActive?: boolean;
  imageId?: number;
}

export interface UpdateBannerData extends Partial<CreateBannerData> {}

export interface BannerOrder {
  id: number;
  orderIndex: number;
}

class BannerService {
  async getAllBanners(active?: boolean): Promise<Banner[]> {
    const params = active !== undefined ? { active: active.toString() } : {};
    const response = await api.get('/banners', { params });
    return response.data;
  }

  async getBannerById(id: number): Promise<Banner> {
    const response = await api.get(`/banners/${id}`);
    return response.data;
  }

  async createBanner(data: CreateBannerData, imageFile?: globalThis.File): Promise<Banner> {
    if (imageFile) {
      // Upload image first
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const uploadResponse = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const uploadedFile = uploadResponse.data;
      data.imageId = uploadedFile.id;
    }

    const response = await api.post('/banners', data);
    return response.data;
  }

  async updateBanner(id: number, data: UpdateBannerData, imageFile?: globalThis.File): Promise<Banner> {
    if (imageFile) {
      // Upload new image first
      const formData = new FormData();
      formData.append('file', imageFile);
      
      const uploadResponse = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const uploadedFile = uploadResponse.data;
      data.imageId = uploadedFile.id;
    }

    const response = await api.put(`/banners/${id}`, data);
    return response.data;
  }

  async deleteBanner(id: number): Promise<void> {
    await api.delete(`/banners/${id}`);
  }

  async toggleBannerStatus(id: number): Promise<Banner> {
    const response = await api.patch(`/banners/${id}/toggle`);
    return response.data;
  }

  async reorderBanners(bannerOrders: BannerOrder[]): Promise<Banner[]> {
    const response = await api.post('/banners/reorder', { bannerOrders });
    return response.data;
  }

  async searchBanners(query: string): Promise<Banner[]> {
    const response = await api.get('/banners/search', { params: { q: query } });
    return response.data;
  }

  // File management methods
  async uploadFile(file: globalThis.File): Promise<File> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  async getAllFiles(): Promise<File[]> {
    const response = await api.get('/upload');
    return response.data;
  }

  async searchFiles(query: string): Promise<File[]> {
    const response = await api.get('/upload/search', { params: { q: query } });
    return response.data;
  }

  async deleteFile(id: number): Promise<void> {
    await api.delete(`/upload/${id}`);
  }
}

export default new BannerService(); 
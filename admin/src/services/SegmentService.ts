import api from './axios';

export interface Segment {
  id: number;
  title: string;
  description?: string;
  icon?: string;
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

export interface CreateSegmentData {
  title: string;
  description?: string;
  icon?: string;
  orderIndex?: number;
  isActive?: boolean;
  imageId?: number;
}

export interface UpdateSegmentData extends Partial<CreateSegmentData> {}

export interface SegmentOrder {
  id: number;
  orderIndex: number;
}

class SegmentService {
  async getAllSegments(active?: boolean): Promise<Segment[]> {
    const params = active !== undefined ? { active: active.toString() } : {};
    const response = await api.get('/segments', { params });
    return response.data;
  }

  async getSegmentById(id: number): Promise<Segment> {
    const response = await api.get(`/segments/${id}`);
    return response.data;
  }

  async createSegment(data: CreateSegmentData, imageFile?: globalThis.File): Promise<Segment> {
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

    const response = await api.post('/segments', data);
    return response.data;
  }

  async updateSegment(id: number, data: UpdateSegmentData, imageFile?: globalThis.File): Promise<Segment> {
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

    const response = await api.put(`/segments/${id}`, data);
    return response.data;
  }

  async deleteSegment(id: number): Promise<void> {
    await api.delete(`/segments/${id}`);
  }

  async toggleSegmentStatus(id: number): Promise<Segment> {
    const response = await api.patch(`/segments/${id}/toggle`);
    return response.data;
  }

  async reorderSegments(segmentOrders: SegmentOrder[]): Promise<Segment[]> {
    const response = await api.post('/segments/reorder', { segmentOrders });
    return response.data;
  }

  async searchSegments(query: string): Promise<Segment[]> {
    const response = await api.get('/segments/search', { params: { q: query } });
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

export default new SegmentService(); 
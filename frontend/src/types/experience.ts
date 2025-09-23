export interface Experience {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  imageId?: number;
  provider_id: number;
  createdAt: string;
  updatedAt: string;
  image?: {
    id: number;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    url: string;
    provider_id: number;
    createdAt: string;
    updatedAt: string;
  };
  provider?: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    website?: string;
    description?: string;
  };
}


export interface CreateExperienceData {
  title: string;
  subtitle?: string;
  description?: string;
  image?: File;
}

export interface ExperiencesResponse {
  data: Experience[];
  total?: number;
  page?: number;
  limit?: number;
}

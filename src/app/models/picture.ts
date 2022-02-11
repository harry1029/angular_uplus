export interface Picture {
  id: number;
  name?: string;
  code?: string;
  description?: string;
  image?: string;
  previewImage?: string;
  thumbnailImage?: string;
  alt?: string;
  quantity?: number;
  rating?: number;
  date?: Date;
}

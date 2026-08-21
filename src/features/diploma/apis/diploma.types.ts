export interface Diploma {
  id: string;
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DiplomaInput {
  title: string;
  description?: string;
  image?: string;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

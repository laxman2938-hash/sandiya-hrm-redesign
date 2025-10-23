// Gallery Images
export interface GalleryImage {
  id: number;
  title: string;
  image: string;
}

// Team Members
export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
}

// Employment Categories
export interface EmploymentCategory {
  id: number;
  title: string;
  image: string;
}

// Legal Documents
export interface LegalDocument {
  id: number;
  title: string;
  image: string;
}

// Achievements
export interface Achievement {
  id: number;
  title: string;
  image: string;
}

// Clients
export interface Client {
  id: number;
  name: string;
  logo: string;
}

// Contact Messages
export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
  status?: string;
}

// Demand Letters
export interface DemandLetter {
  id: number;
  title: string;
  image: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

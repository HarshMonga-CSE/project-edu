export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  bio: string;
  imageUrl: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (userData: Omit<User, 'id' | 'bio' | 'imageUrl'> & { password: string }) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export interface FormErrors {
  [key: string]: string;
}
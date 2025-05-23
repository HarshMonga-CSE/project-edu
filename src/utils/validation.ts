import { FormErrors } from '../types';

export const validateSignupForm = (formData: {
  name: string;
  phone: string;
  email: string;
  password: string;
  company: string;
}): FormErrors => {
  const errors: FormErrors = {};
  
  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  
  // Company is optional, no validation required
  
  return errors;
};

export const validateLoginForm = (formData: {
  email: string;
  password: string;
}): FormErrors => {
  const errors: FormErrors = {};
  
  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  }
  
  return errors;
};
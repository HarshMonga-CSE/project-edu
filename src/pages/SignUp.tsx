import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { AtSign, Building, Key, Phone, User, ArrowLeft } from 'lucide-react';
import { validateSignupForm } from '../utils/validation';
import { FormErrors } from '../types';
import { useAuthStore } from '../store/authStore';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateSignupForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        signup({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          company: formData.company,
        });
        
        setIsSubmitting(false);
        navigate('/login');
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <Card>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600 mb-6">Fill in your details to get started</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="name"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              icon={<User size={18} />}
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name}
            />
            
            <Input
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              icon={<Phone size={18} />}
              value={formData.phone}
              onChange={handleChange}
              required
              error={errors.phone}
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email address"
              icon={<AtSign size={18} />}
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Create a strong password"
              icon={<Key size={18} />}
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />
            
            <Input
              id="company"
              name="company"
              label="Company Name"
              placeholder="Enter your company name"
              icon={<Building size={18} />}
              value={formData.company}
              onChange={handleChange}
            />
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">Are you an Agency?</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isAgency"
                    checked={formData.isAgency}
                    onChange={() => setFormData({ ...formData, isAgency: true })}
                    className="form-radio h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="isAgency"
                    checked={!formData.isAgency}
                    onChange={() => setFormData({ ...formData, isAgency: false })}
                    className="form-radio h-4 w-4 text-primary-600 transition duration-150 ease-in-out"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
              >
                Create Account
              </Button>
            </div>
            
            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign In
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
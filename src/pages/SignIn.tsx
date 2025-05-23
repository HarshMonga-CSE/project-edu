import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { AtSign, Key, ArrowLeft, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { validateLoginForm } from '../utils/validation';
import { FormErrors } from '../types';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    if (loginError) {
      setLoginError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        const success = login(formData.email, formData.password);
        
        setIsSubmitting(false);
        
        if (success) {
          navigate('/account');
        } else {
          setLoginError('Invalid email or password. Please try again.');
        }
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-400 to-secondary-500 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
      
      <div className="w-full max-w-auth animate-slide-up relative">
        <Card>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to home
          </button>
          
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-3 rounded-full">
              <Shield size={32} className="text-primary-600 animate-pulse-slow" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Welcome back!</h1>
          <p className="text-gray-600 mb-6 text-center">Sign in to your account to continue</p>
          
          {loginError && (
            <div className="bg-error-100 border border-error-300 text-error-700 px-4 py-3 rounded mb-4">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              icon={<Key size={18} />}
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />
            
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
              >
                Sign In
              </Button>
            </div>
            
            <p className="text-center text-gray-600 text-sm mt-4">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign Up
              </button>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignIn
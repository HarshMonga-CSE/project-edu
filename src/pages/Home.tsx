import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-400 to-secondary-500 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
      
      <div className="w-full max-w-auth animate-slide-up relative">
        <Card className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-3 rounded-full">
              <Sparkles size={32} className="text-primary-600 animate-pulse-slow" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to AuthFlow</h1>
          <p className="text-gray-600 mb-8">Your secure and beautiful authentication system</p>
          
          <div className="space-y-4">
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => navigate('/signup')}
              className="group"
            >
              <UserPlus size={18} className="mr-2 group-hover:animate-pulse" />
              Create Account
            </Button>
            
            <Button 
              variant="secondary" 
              fullWidth
              onClick={() => navigate('/login')}
              className="group"
            >
              <LogIn size={18} className="mr-2 group-hover:animate-pulse" />
              Already Registered? Login
            </Button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our Terms of Service
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home
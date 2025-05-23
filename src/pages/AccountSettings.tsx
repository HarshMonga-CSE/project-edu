import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <Card>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your profile and account</p>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-4 mb-6">
            <Avatar 
              src={user.imageUrl} 
              alt={user.name} 
              size="xl" 
              status="online"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">{user.company}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">About Me</h3>
            <p className="text-gray-600">{user.bio}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <User size={18} className="mr-2" />
                Edit Profile
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                className="border-error-300 text-error-700 hover:bg-error-50"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
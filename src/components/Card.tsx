import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 backdrop-blur-sm bg-opacity-90 animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

export default Card;
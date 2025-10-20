import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        bg-black/10 
        backdrop-blur-lg 
        rounded-2xl 
        border border-white/20 
        shadow-lg
        p-6 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

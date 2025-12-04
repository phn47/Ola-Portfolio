import React, { ButtonHTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  withIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  withIcon = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 font-sora font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1";
  
  const variants = {
    primary: "bg-gold text-black hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-transparent",
    outline: "bg-transparent text-white border border-gold hover:bg-gold hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:pl-2"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {withIcon && <ArrowRight className="ml-2 w-5 h-5" />}
    </button>
  );
};

export default Button;
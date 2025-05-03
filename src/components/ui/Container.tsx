import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
  size = 'lg',
  padding = true,
}: ContainerProps) {
  // Size classes
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };
  
  const paddingClasses = padding ? 'px-4 md:px-6 lg:px-8' : '';
  
  const classes = twMerge(
    'mx-auto w-full',
    sizeClasses[size],
    paddingClasses,
    className
  );
  
  return <Component className={classes}>{children}</Component>;
} 
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'subheading' | 'body' | 'body-lg' | 'small';
  as?: React.ElementType;
  className?: string;
  color?: 'default' | 'primary' | 'secondary' | 'white' | 'gray';
}

export default function Typography({
  children,
  variant = 'body',
  as,
  className = '',
  color = 'default',
}: TypographyProps) {
  // Map variants to element types if not specified
  const defaultElementMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    subheading: 'h5',
    'body-lg': 'p',
    body: 'p',
    small: 'span',
  };
  
  const Component = as || defaultElementMap[variant];
  
  // Variant classes
  const variantClasses = {
    h1: 'text-4xl md:text-5xl font-bold leading-tight md:leading-tight tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold leading-tight md:leading-tight',
    h3: 'text-2xl md:text-3xl font-semibold leading-snug',
    h4: 'text-xl md:text-2xl font-semibold leading-snug',
    subheading: 'text-lg md:text-xl font-medium leading-normal',
    'body-lg': 'text-lg leading-relaxed',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-normal',
  };
  
  // Color classes
  const colorClasses = {
    default: '',
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    gray: 'text-gray',
  };
  
  const classes = twMerge(
    variantClasses[variant],
    colorClasses[color],
    className
  );
  
  return <Component className={classes}>{children}</Component>;
} 
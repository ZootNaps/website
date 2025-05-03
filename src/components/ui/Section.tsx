import React from 'react';
import { twMerge } from 'tailwind-merge';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  background?: 'white' | 'light' | 'primary' | 'secondary';
  spacing?: 'sm' | 'md' | 'lg' | 'none';
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export default function Section({
  children,
  className = '',
  containerClassName = '',
  id,
  background = 'white',
  spacing = 'md',
  container = true,
  containerSize = 'lg',
}: SectionProps) {
  // Background classes
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-bg',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
  };
  
  // Spacing classes
  const spacingClasses = {
    none: '',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  };
  
  const classes = twMerge(
    backgroundClasses[background],
    spacingClasses[spacing],
    className
  );
  
  return (
    <section id={id} className={classes}>
      {container ? (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
} 
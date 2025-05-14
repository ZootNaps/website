'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import Typography from '@/components/ui/Typography';

export default function MetricsSection() {
  return (
    <Section background="light" spacing="md">
      <div className="container mx-auto px-4">
        <Typography 
          variant="h2" 
          color="primary" 
          className="text-center mb-8"
        >
          Our Track Record
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Typography variant="h3" color="secondary" className="mb-2">98%</Typography>
            <Typography variant="body">Customer Satisfaction</Typography>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Typography variant="h3" color="secondary" className="mb-2">250+</Typography>
            <Typography variant="body">Projects Completed</Typography>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Typography variant="h3" color="secondary" className="mb-2">15+</Typography>
            <Typography variant="body">Years of Experience</Typography>
          </div>
        </div>
      </div>
    </Section>
  );
} 
import React from 'react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function StyleGuidePage() {
  return (
    <div>
      {/* Typography Section */}
      <Section background="white" spacing="md">
        <Typography variant="h1" color="primary">Style Guide</Typography>
        <Typography variant="body-lg" className="mb-8">
          This page demonstrates the global styling system and UI components.
        </Typography>
        
        <div className="mb-12">
          <Typography variant="h2" color="primary" className="mb-6">Typography</Typography>
          
          <div className="space-y-6">
            <div>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="small" className="text-gray">text-4xl md:text-5xl font-bold</Typography>
            </div>
            
            <div>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="small" className="text-gray">text-3xl md:text-4xl font-bold</Typography>
            </div>
            
            <div>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="small" className="text-gray">text-2xl md:text-3xl font-semibold</Typography>
            </div>
            
            <div>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="small" className="text-gray">text-xl md:text-2xl font-semibold</Typography>
            </div>
            
            <div>
              <Typography variant="subheading">Subheading</Typography>
              <Typography variant="small" className="text-gray">text-lg md:text-xl font-medium</Typography>
            </div>
            
            <div>
              <Typography variant="body-lg">Body Large</Typography>
              <Typography variant="small" className="text-gray">text-lg leading-relaxed</Typography>
            </div>
            
            <div>
              <Typography variant="body">Body Regular</Typography>
              <Typography variant="small" className="text-gray">text-base leading-relaxed</Typography>
            </div>
            
            <div>
              <Typography variant="small">Small Text</Typography>
              <Typography variant="small" className="text-gray">text-sm leading-normal</Typography>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Colors Section */}
      <Section background="light" spacing="md">
        <Typography variant="h2" color="primary" className="mb-6">Colors</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <Typography variant="h3" className="mb-4">Brand Colors</Typography>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Primary</Typography>
                  <Typography variant="small" className="text-gray">#2a3d45</Typography>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-light rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Primary Light</Typography>
                  <Typography variant="small" className="text-gray">#3a4d55</Typography>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-dark rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Primary Dark</Typography>
                  <Typography variant="small" className="text-gray">#1a2d35</Typography>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-4">Accent Colors</Typography>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-secondary rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Secondary</Typography>
                  <Typography variant="small" className="text-gray">#e76f51</Typography>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-secondary-light rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Secondary Light</Typography>
                  <Typography variant="small" className="text-gray">#f08f75</Typography>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-secondary-dark rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Secondary Dark</Typography>
                  <Typography variant="small" className="text-gray">#d55f41</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography variant="h3" className="mb-4">Background Colors</Typography>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-bg border border-gray-200 rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Background Light</Typography>
                  <Typography variant="small" className="text-gray">#f8f3ed</Typography>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-bg-dark border border-gray-200 rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Background Dark</Typography>
                  <Typography variant="small" className="text-gray">#e8e3dd</Typography>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-4">Text Colors</Typography>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Text Gray</Typography>
                  <Typography variant="small" className="text-gray">#718096</Typography>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-dark rounded-md mr-4"></div>
                <div>
                  <Typography variant="subheading" className="mb-1">Text Gray Dark</Typography>
                  <Typography variant="small" className="text-gray">#4a5568</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Buttons Section */}
      <Section background="white" spacing="md">
        <Typography variant="h2" color="primary" className="mb-6">Buttons</Typography>
        
        <div className="space-y-8">
          <div>
            <Typography variant="h3" className="mb-4">Button Variants</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-4">Button Sizes</Typography>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small Button</Button>
              <Button variant="primary" size="md">Medium Button</Button>
              <Button variant="primary" size="lg">Large Button</Button>
            </div>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-4">Button States</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" className="opacity-90">Hover (simulated)</Button>
            </div>
          </div>
          
          <div>
            <Typography variant="h3" className="mb-4">Link Buttons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href="#">Link Button</Button>
              <Button variant="secondary" href="#">Secondary Link</Button>
              <Button variant="outline" href="#">Outline Link</Button>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Sections & Containers */}
      <Section background="primary" spacing="md">
        <Typography variant="h2" color="white" className="mb-6">Sections & Containers</Typography>
        <Typography variant="body" color="white" className="mb-8">
          This is a primary background section with default container.
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg">
            <Typography variant="h4" className="mb-2">Container Sizes</Typography>
            <Typography variant="small">
              Use different container sizes with the Container component: sm, md, lg, xl, full
            </Typography>
          </div>
          
          <div className="bg-white p-6 rounded-lg">
            <Typography variant="h4" className="mb-2">Section Backgrounds</Typography>
            <Typography variant="small">
              Sections can have white, light, primary, or secondary backgrounds
            </Typography>
          </div>
          
          <div className="bg-white p-6 rounded-lg">
            <Typography variant="h4" className="mb-2">Section Spacing</Typography>
            <Typography variant="small">
              Control vertical spacing with sm, md, lg, or none options
            </Typography>
          </div>
        </div>
      </Section>
      
      <Section background="secondary" spacing="md">
        <Typography variant="h2" color="white" className="mb-6">Secondary Background Section</Typography>
        <Typography variant="body" color="white">
          This demonstrates a section with secondary background color.
        </Typography>
      </Section>
      
      <Section background="light" spacing="sm">
        <Typography variant="h2" color="primary" className="mb-6">Light Background Section (Small Spacing)</Typography>
        <Typography variant="body">
          This demonstrates a section with light background color and small vertical spacing.
        </Typography>
      </Section>
      
      <Section background="white" spacing="lg">
        <Typography variant="h2" color="primary" className="mb-6">White Background Section (Large Spacing)</Typography>
        <Typography variant="body">
          This demonstrates a section with white background color and large vertical spacing.
        </Typography>
      </Section>
    </div>
  );
} 
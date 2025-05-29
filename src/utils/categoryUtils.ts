// Category utility functions for blog posts

export type BlogCategory = 'Playbook' | 'Deep Dive' | 'Strategy' | 'Case Study' | 'Industry Insights' | 'How To';

// Category configuration object
export const categoryConfig = {
  'Playbook': {
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: 'Step-by-step guides and actionable frameworks',
    icon: '📋'
  },
  'Deep Dive': {
    color: 'bg-blue-600',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'In-depth analysis and comprehensive coverage',
    icon: '🔍'
  },
  'Strategy': {
    color: 'bg-purple-600',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    description: 'Strategic insights and planning guidance',
    icon: '🎯'
  },
  'Case Study': {
    color: 'bg-orange-600',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: 'Real-world examples and success stories',
    icon: '📊'
  },
  'Industry Insights': {
    color: 'bg-indigo-600',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    description: 'Market trends and industry analysis',
    icon: '📈'
  },
  'How To': {
    color: 'bg-green-600',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: 'Practical tutorials and implementation guides',
    icon: '🛠️'
  }
} as const;

// Get category styling
export function getCategoryStyle(category: string | undefined): {
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
  icon: string;
} {
  if (!category || !(category in categoryConfig)) {
    // Default styling for unknown categories
    return {
      color: 'bg-secondary',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      description: 'General content',
      icon: '📝'
    };
  }
  
  return categoryConfig[category as keyof typeof categoryConfig];
}

// Get all available categories
export function getAllCategories(): string[] {
  return Object.keys(categoryConfig);
}

// Check if category is valid
export function isValidCategory(category: string): category is BlogCategory {
  return category in categoryConfig;
}

// Get category priority for sorting (useful for display order)
export function getCategoryPriority(category: string): number {
  const priorities: Record<string, number> = {
    'Playbook': 1,
    'Deep Dive': 2,
    'Strategy': 3,
    'Case Study': 4,
    'Industry Insights': 5,
    'How To': 6
  };
  
  return priorities[category] || 999;
}

// Sort categories by priority
export function sortCategoriesByPriority(categories: string[]): string[] {
  return categories.sort((a, b) => getCategoryPriority(a) - getCategoryPriority(b));
} 
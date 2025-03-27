
import { BookmarkIcon, Share2Icon } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  category: string;
  state?: string;
  stateSpecific?: boolean;
  colorScheme?: string;
  icon?: LucideIcon;
  shareIcon?: LucideIcon;
  bookmarkIcon?: LucideIcon;
}

// Sample scheme data
export const schemes: Scheme[] = [
  {
    id: 1,
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support for farmers',
    eligibility: 'All small and marginal farmers',
    benefits: '₹6,000 per year in three installments',
    category: 'Agriculture'
  },
  {
    id: 2,
    name: 'Ayushman Bharat',
    description: 'Health insurance scheme',
    eligibility: 'Low income families',
    benefits: 'Coverage up to ₹5 lakh per family per year',
    category: 'Health'
  },
  {
    id: 3,
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for all',
    eligibility: 'Economically weaker sections, low income groups',
    benefits: 'Financial assistance for house construction',
    category: 'Housing'
  },
  {
    id: 4,
    name: 'Pradhan Mantri Ujjwala Yojana',
    description: 'LPG connection to women from below poverty line households',
    eligibility: 'Women from BPL households without LPG connection',
    benefits: 'Free LPG connection with financial assistance',
    category: 'Energy'
  },
  {
    id: 5,
    name: 'Soil Health Card Scheme',
    description: 'Soil testing and nutrient recommendations',
    eligibility: 'All farmers',
    benefits: 'Free soil health card and personalized recommendations',
    category: 'Agriculture'
  },
  {
    id: 6,
    name: 'Pradhan Mantri Kaushal Vikas Yojana',
    description: 'Skill development training',
    eligibility: 'Youth with basic education',
    benefits: 'Free skill training and certification',
    category: 'Skill Development'
  },
  {
    id: 7,
    name: 'Beti Bachao Beti Padhao',
    description: 'Promote education for girls',
    eligibility: 'Girl children',
    benefits: 'Educational incentives and scholarships',
    category: 'Education'
  },
  {
    id: 8,
    name: 'Assistance to Disabled Persons Scheme',
    description: 'Support for assistive devices',
    eligibility: 'Persons with disabilities',
    benefits: 'Subsidized assistive devices and aids',
    category: 'Disability Welfare'
  },
  {
    id: 9,
    name: 'Kerala Karunya Health Scheme',
    description: 'Financial assistance for medical treatment',
    eligibility: 'Kerala residents with low income',
    benefits: 'Financial support for critical illnesses',
    category: 'Health',
    stateSpecific: true,
    state: 'Kerala'
  },
  {
    id: 10,
    name: 'Tamil Nadu Chief Minister\'s Health Insurance',
    description: 'Comprehensive health coverage',
    eligibility: 'Tamil Nadu residents',
    benefits: 'Health insurance coverage up to ₹5 lakh',
    category: 'Health',
    stateSpecific: true,
    state: 'Tamil Nadu'
  },
  {
    id: 11,
    name: 'Gujarat Mukhyamantri Yuva Swavalamban Yojana',
    description: 'Education support for youth',
    eligibility: 'Students from Gujarat with family income below ₹6 lakh',
    benefits: 'Financial assistance for higher education',
    category: 'Education',
    stateSpecific: true,
    state: 'Gujarat'
  },
  {
    id: 12,
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme',
    eligibility: 'All farmers including sharecroppers and tenant farmers',
    benefits: 'Insurance coverage for crop loss due to natural calamities',
    category: 'Agriculture'
  },
  {
    id: 13,
    name: 'National Pension Scheme',
    description: 'Pension scheme for citizens',
    eligibility: 'All Indian citizens between 18-60 years',
    benefits: 'Retirement income with tax benefits',
    category: 'Pension'
  },
  {
    id: 14,
    name: 'Atal Pension Yojana',
    description: 'Pension scheme focused on unorganized sector',
    eligibility: 'Citizens aged 18-40 years',
    benefits: 'Fixed pension of ₹1,000 to ₹5,000 per month after 60 years of age',
    category: 'Pension'
  },
  {
    id: 15,
    name: 'Mid-Day Meal Scheme',
    description: 'School meal program',
    eligibility: 'Children studying in government schools',
    benefits: 'Free nutritious meal during school hours',
    category: 'Education'
  }
];

// Get all unique categories from schemes
export const getCategories = (): string[] => {
  const categories = new Set<string>();
  schemes.forEach(scheme => categories.add(scheme.category));
  return Array.from(categories).sort();
};

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

export interface ServiceItem {
  id: string
  title: string
  shortDescription: string
  iconName: string
  details?: string[]
}

export interface FAQItem {
  question: string
  answer: string
  category?: 'general' | 'process' | 'compliance' | 'pricing'
}

export interface InquiryFormData {
  name: string
  email: string
  businessName: string
  country: string
  serviceRequired: string
  message: string
}


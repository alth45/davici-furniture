import { Metadata } from 'next';
import ContactClient from '@/components/ContactClient'; // Import yang baru

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Davici Furniture for support and inquiries.',
};

export default function ContactPage() {
  return <ContactClient />;
}
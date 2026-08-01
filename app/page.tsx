console.log("Firebase project:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
import type { Metadata } from 'next';
import CourseExplorer from './components/CourseExplorer';

export const metadata: Metadata = {
  title: 'Specialized Online Learning Platform',
  description: 'Explore curated video courses...',
  openGraph: {
    title: 'Specialized Online Learning Platform',
    description: 'Explore curated video content...',
    url: 'https://learning-platform-two-gamma.vercel.app',
    siteName: 'Learning Platform',
    type: 'website',
  },
  verification:{
    google: 'OeVPHR0FIUS4HjUgTotbPX8DejyF5DFr3UULP8SM668',
  }
};

export default function Page() {
  
  return <CourseExplorer />;
}
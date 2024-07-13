import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist on GrantHub."
        keywords={['404', 'not found', 'error']}
      />
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
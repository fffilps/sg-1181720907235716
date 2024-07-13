import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Bookmark } from 'lucide-react';

export default function GrantCard({ grant }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSaveGrant = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save grants.",
        variant: "destructive",
      });
      return;
    }

    setIsSaved(!isSaved);
    // Here you would typically send a request to your backend to save/unsave the grant
    toast({
      title: isSaved ? "Grant Unsaved" : "Grant Saved",
      description: isSaved ? "The grant has been removed from your saved list." : "The grant has been added to your saved list.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`h-full flex flex-col ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      >
        <CardHeader>
          <CardTitle className="text-lg">{grant.title}</CardTitle>
          <Badge>{grant.category}</Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Amount:</strong> {grant.amount}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Deadline:</strong> {grant.deadline}</p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  This grant aims to support innovative projects in the {grant.category} sector. 
                  Apply now to get funding for your groundbreaking ideas!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`grant-details-${grant.id}`}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
          </Button>
          <Button 
            variant="outline"
            onClick={handleSaveGrant}
            aria-label={isSaved ? "Unsave Grant" : "Save Grant"}
          >
            <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
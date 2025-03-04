import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Bookmark, Share2, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function GrantCard({ grant }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const deadline = new Date(grant.deadline);
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysLeft(daysDiff);
  }, [grant.deadline]);

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
    toast({
      title: isSaved ? "Grant Unsaved" : "Grant Saved",
      description: isSaved ? "The grant has been removed from your saved list." : "The grant has been added to your saved list.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: grant.title,
        text: `Check out this grant: ${grant.title}`,
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared Successfully",
          description: "The grant has been shared.",
        });
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "The grant link has been copied to your clipboard.",
        });
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card 
        className={`h-full flex flex-col ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        role="article"
        aria-labelledby={`grant-title-${grant.id}`}
      >
        <CardHeader>
          <CardTitle id={`grant-title-${grant.id}`} className="text-lg">{grant.title}</CardTitle>
          <Badge>{grant.category}</Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Amount:</strong> {grant.amount}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Deadline:</strong> {grant.deadline}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Clock className="mr-2" size={16} />
            {daysLeft > 0 ? `${daysLeft} days left to apply` : "Deadline has passed"}
          </p>
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
            className="flex items-center"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Learn More
              </>
            )}
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleSaveGrant}
              aria-label={isSaved ? "Unsave Grant" : "Save Grant"}
              aria-pressed={isSaved}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="sr-only">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              aria-label="Share Grant"
            >
              <Share2 className="mr-2 h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
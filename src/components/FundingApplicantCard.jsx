import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Bookmark, Share2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import MilestoneTracker from './MilestoneTracker';

export default function FundingApplicantCard({ applicant }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSaveApplicant = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save applicants.",
        variant: "destructive",
      });
      return;
    }

    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Applicant Unsaved" : "Applicant Saved",
      description: isSaved ? "The applicant has been removed from your saved list." : "The applicant has been added to your saved list.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: applicant.projectTitle,
        text: `Check out this project: ${applicant.projectTitle} by ${applicant.name}`,
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared Successfully",
          description: "The applicant's project has been shared.",
        });
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "The applicant's project link has been copied to your clipboard.",
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
        aria-labelledby={`applicant-name-${applicant.id}`}
      >
        <CardHeader>
          <CardTitle id={`applicant-name-${applicant.id}`} className="text-lg">{applicant.name}</CardTitle>
          <Badge>{applicant.category}</Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Project:</strong> {applicant.projectTitle}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Funding Needed:</strong> ${applicant.fundingNeeded}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            <Clock className="mr-2" size={16} />
            Project Deadline: {applicant.projectDeadline}
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MilestoneTracker milestones={applicant.milestones} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`applicant-details-${applicant.id}`}
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
                View Milestones
              </>
            )}
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleSaveApplicant}
              aria-label={isSaved ? "Unsave Applicant" : "Save Applicant"}
              aria-pressed={isSaved}
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="sr-only">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              aria-label="Share Applicant"
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
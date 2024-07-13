import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function GrantCard({ grant }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsExpanded(!isExpanded);
    }
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
          </Button>
          <Button 
            variant="outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
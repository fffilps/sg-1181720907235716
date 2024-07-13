import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GrantCard({ grant }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg">{grant.title}</CardTitle>
          <Badge>{grant.category}</Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Amount:</strong> {grant.amount}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Deadline:</strong> {grant.deadline}</p>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                This grant aims to support innovative projects in the {grant.category} sector. 
                Apply now to get funding for your groundbreaking ideas!
              </p>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : 'Learn More'}
          </Button>
          <Button variant="outline">Apply Now</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
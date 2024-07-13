import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Welcome to GrantHub",
    content: "GrantHub is your one-stop platform for discovering and applying to grants. Let's get you started!",
  },
  {
    title: "Discover Grants",
    content: "Use our search and filter options to find grants that match your interests and qualifications.",
  },
  {
    title: "Apply with Ease",
    content: "Our streamlined application process makes it simple to apply for multiple grants.",
  },
  {
    title: "Track Your Progress",
    content: "Keep track of all your applications and their statuses in one place.",
  },
];

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="w-96">
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{steps[currentStep].content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onComplete}>Skip</Button>
              <Button onClick={handleNext}>
                {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
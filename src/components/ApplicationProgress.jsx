import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

const stages = [
  { id: 1, name: "Application Submitted" },
  { id: 2, name: "Initial Review" },
  { id: 3, name: "Detailed Evaluation" },
  { id: 4, name: "Interview" },
  { id: 5, name: "Final Decision" },
];

export default function ApplicationProgress({ application }) {
  const [currentStage, setCurrentStage] = useState(application.currentStage || 1);

  const handleUpdateStage = (newStage) => {
    // In a real app, you'd send this update to your backend
    setCurrentStage(newStage);
    toast({
      title: "Progress Updated",
      description: `Application stage updated to: ${stages[newStage - 1].name}`,
    });
  };

  const progressPercentage = (currentStage / stages.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Progress: {application.grantTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="mb-4" />
        <div className="space-y-4">
          {stages.map((stage) => (
            <div key={stage.id} className="flex items-center justify-between">
              <span className={currentStage >= stage.id ? "font-bold" : ""}>{stage.name}</span>
              {currentStage < stage.id && (
                <Button onClick={() => handleUpdateStage(stage.id)} size="sm">
                  Mark as Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
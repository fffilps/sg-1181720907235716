import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Clock } from 'lucide-react';

export default function DeadlineReminder({ grant }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [isReminderSet, setIsReminderSet] = useState(false);

  useEffect(() => {
    const deadline = new Date(grant.deadline);
    const today = new Date();
    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDaysLeft(daysDiff);
  }, [grant.deadline]);

  const handleSetReminder = () => {
    // In a real app, this would interact with a backend to set up notifications
    setIsReminderSet(true);
    toast({
      title: "Reminder Set",
      description: `You will be reminded about the ${grant.title} deadline.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2" />
          Deadline Reminder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          <strong>{grant.title}</strong> deadline: {grant.deadline}
        </p>
        <p className="flex items-center mb-4">
          <Clock className="mr-2" />
          {daysLeft > 0 ? `${daysLeft} days left to apply` : "Deadline has passed"}
        </p>
        {daysLeft > 0 && (
          <Button onClick={handleSetReminder} disabled={isReminderSet}>
            {isReminderSet ? "Reminder Set" : "Set Reminder"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
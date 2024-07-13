import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function EmailPreferences() {
  const [preferences, setPreferences] = useState({
    newGrants: true,
    applicationUpdates: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // In a real app, you'd send this data to your backend
    console.log('Saving preferences:', preferences);
    toast({
      title: "Preferences Saved",
      description: "Your email preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="newGrants">New Grant Notifications</Label>
          <Switch
            id="newGrants"
            checked={preferences.newGrants}
            onCheckedChange={() => handleToggle('newGrants')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="applicationUpdates">Application Updates</Label>
          <Switch
            id="applicationUpdates"
            checked={preferences.applicationUpdates}
            onCheckedChange={() => handleToggle('applicationUpdates')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="weeklyDigest">Weekly Digest</Label>
          <Switch
            id="weeklyDigest"
            checked={preferences.weeklyDigest}
            onCheckedChange={() => handleToggle('weeklyDigest')}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="marketingEmails">Marketing Emails</Label>
          <Switch
            id="marketingEmails"
            checked={preferences.marketingEmails}
            onCheckedChange={() => handleToggle('marketingEmails')}
          />
        </div>
        <Button onClick={handleSave} className="w-full">Save Preferences</Button>
      </CardContent>
    </Card>
  );
}
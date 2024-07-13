import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import SEO from '@/components/SEO';

export default function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    email: user?.email || '',
    notifyNewGrants: true,
    notifyApplicationUpdates: true,
    notifyNewFeatures: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name) => {
    setSettings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log('Updated settings:', settings);
    toast({
      title: "Settings Updated",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <>
      <SEO 
        title="User Settings"
        description="Manage your GrantHub account settings and preferences."
        keywords={['settings', 'account', 'preferences', 'notifications']}
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notifyNewGrants">Notify me about new grants</Label>
                <Switch
                  id="notifyNewGrants"
                  checked={settings.notifyNewGrants}
                  onCheckedChange={() => handleSwitchChange('notifyNewGrants')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notifyApplicationUpdates">Notify me about application updates</Label>
                <Switch
                  id="notifyApplicationUpdates"
                  checked={settings.notifyApplicationUpdates}
                  onCheckedChange={() => handleSwitchChange('notifyApplicationUpdates')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notifyNewFeatures">Notify me about new features</Label>
                <Switch
                  id="notifyNewFeatures"
                  checked={settings.notifyNewFeatures}
                  onCheckedChange={() => handleSwitchChange('notifyNewFeatures')}
                />
              </div>
              <Button type="submit">Save Settings</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
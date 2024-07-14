import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import SEO from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import MilestoneTracker from '@/components/MilestoneTracker';

export default function Profile() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    projectTitle: '',
    category: '',
    fundingNeeded: '',
    projectDeadline: '',
    bio: '',
  });
  const [milestones, setMilestones] = useState([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        projectTitle: user.projectTitle || '',
        category: user.category || '',
        fundingNeeded: user.fundingNeeded || '',
        projectDeadline: user.projectDeadline || '',
        bio: user.bio || '',
      });
      setMilestones(user.milestones || []);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleNotificationChange = (name) => {
    setNotifications(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile data to your backend
    console.log('Updated profile data:', profile);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleMilestoneToggle = (id) => {
    setMilestones(prevMilestones =>
      prevMilestones.map(milestone =>
        milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
      )
    );
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    const newMilestone = {
      id: Date.now(),
      title: e.target.elements.newMilestone.value,
      completed: false,
    };
    setMilestones([...milestones, newMilestone]);
    e.target.reset();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <>
      <SEO 
        title="User Profile"
        description="Manage your FundHub user profile and project details."
        keywords={['profile', 'user', 'settings', 'project', 'funding']}
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="project">Project Details</TabsTrigger>
            <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit">Update Profile</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="project">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle">Project Title</Label>
                    <Input
                      id="projectTitle"
                      name="projectTitle"
                      value={profile.projectTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={profile.category}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fundingNeeded">Funding Needed</Label>
                    <Input
                      id="fundingNeeded"
                      name="fundingNeeded"
                      type="number"
                      value={profile.fundingNeeded}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectDeadline">Project Deadline</Label>
                    <Input
                      id="projectDeadline"
                      name="projectDeadline"
                      type="date"
                      value={profile.projectDeadline}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit">Update Project Details</Button>
                </form>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Project Milestones</h3>
                  <MilestoneTracker milestones={milestones} onToggle={handleMilestoneToggle} />
                  <form onSubmit={handleAddMilestone} className="mt-4">
                    <Input
                      name="newMilestone"
                      placeholder="Add new milestone"
                      className="mb-2"
                    />
                    <Button type="submit">Add Milestone</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange('email')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.push}
                      onCheckedChange={() => handleNotificationChange('push')}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import SEO from '@/components/SEO';

export default function Account() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    organization: 'Tech Innovators Inc.',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const applicationData = [
    { name: 'Pending', value: 5 },
    { name: 'Approved', value: 3 },
    { name: 'Rejected', value: 2 },
  ];

  const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevPasswords => ({ ...prevPasswords, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user data:', user);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    console.log('Password change requested');
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <>
      <SEO 
        title="Account Management"
        description="Manage your GrantHub account, update your profile, change your password, and view your application statistics."
        keywords={['account', 'profile', 'password', 'statistics', 'grants']}
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Account Management</h1>
        <Tabs defaultValue="profile">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
            <TabsTrigger value="stats">Application Stats</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={user.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          name="organization"
                          value={user.organization}
                          onChange={handleInputChange}
                        />
                      </div>
                      <Button type="submit">Update Profile</Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="password">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input
                          id="current"
                          name="current"
                          type="password"
                          value={passwords.current}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input
                          id="new"
                          name="new"
                          type="password"
                          value={passwords.new}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm">Confirm New Password</Label>
                        <Input
                          id="confirm"
                          name="confirm"
                          type="password"
                          value={passwords.confirm}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <Button type="submit">Change Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="stats">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Application Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={applicationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {applicationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </>
  );
}
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const dummyApplications = [
  { id: 1, grantTitle: "Environmental Research Grant", status: "Pending", progress: 50 },
  { id: 2, grantTitle: "Tech Innovation Fund", status: "Approved", progress: 100 },
  { id: 3, grantTitle: "Community Development Project", status: "Rejected", progress: 75 },
];

const dummySavedGrants = [
  { id: 1, title: "Medical Research Grant", category: "Health", amount: "$75,000", deadline: "2024-08-31" },
  { id: 2, title: "Arts and Culture Fund", category: "Arts", amount: "$30,000", deadline: "2024-09-15" },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [savedGrants, setSavedGrants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      // In a real app, you'd fetch this data from your backend
      setApplications(dummyApplications);
      setSavedGrants(dummySavedGrants);
    }
  }, [user]);

  const applicationData = [
    { name: 'Pending', value: applications.filter(app => app.status === 'Pending').length },
    { name: 'Approved', value: applications.filter(app => app.status === 'Approved').length },
    { name: 'Rejected', value: applications.filter(app => app.status === 'Rejected').length },
  ];

  const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

  const filteredApplications = applications.filter(app =>
    app.grantTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSavedGrants = savedGrants.filter(grant =>
    grant.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveSavedGrant = (id) => {
    setSavedGrants(savedGrants.filter(grant => grant.id !== id));
    toast({
      title: "Grant Removed",
      description: "The grant has been removed from your saved list.",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <>
      <SEO 
        title="User Dashboard"
        description="View your grant applications and saved grants on GrantHub."
        keywords={['dashboard', 'grants', 'applications', 'user']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <Input
          type="text"
          placeholder="Search applications and saved grants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          aria-label="Search applications and saved grants"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {filteredApplications.map(app => (
                  <li key={app.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>{app.grantTitle}</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${app.progress}%`}}></div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/applications" passHref>
                <Button className="mt-4">View All Applications</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Saved Grants</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {filteredSavedGrants.map(grant => (
                  <li key={grant.id} className="flex justify-between items-center">
                    <span>{grant.title}</span>
                    <div>
                      <span className="text-sm text-gray-500 mr-2">Deadline: {grant.deadline}</span>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveSavedGrant(grant.id)}>Remove</Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/" passHref>
                <Button className="mt-4">Explore More Grants</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
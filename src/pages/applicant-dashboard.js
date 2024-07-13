import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import MessagingSystem from '@/components/MessagingSystem';

const dummyApplications = [
  { id: 1, grantTitle: "Environmental Research Grant", status: "Pending", progress: 50 },
  { id: 2, grantTitle: "Tech Innovation Fund", status: "Approved", progress: 100 },
  { id: 3, grantTitle: "Community Development Project", status: "Rejected", progress: 75 },
];

export default function ApplicantDashboard() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real app, you'd fetch this data from your backend
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setApplications(dummyApplications);
      } catch (err) {
        setError('Failed to fetch applications. Please try again.');
        toast({
          title: "Error",
          description: "Failed to fetch applications. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user, toast]);

  const applicationData = [
    { name: 'Pending', value: applications.filter(app => app.status === 'Pending').length },
    { name: 'Approved', value: applications.filter(app => app.status === 'Approved').length },
    { name: 'Rejected', value: applications.filter(app => app.status === 'Rejected').length },
  ];

  const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <>
      <SEO 
        title="Applicant Dashboard"
        description="View your grant applications and statistics on GrantHub."
        keywords={['dashboard', 'grants', 'applications', 'applicant']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Applicant Dashboard</h1>
        
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
              <CardTitle>Your Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {applications.map(app => (
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
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                        style={{width: `${app.progress}%`}}
                      ></div>
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
      </div>
      <MessagingSystem />
    </>
  );
}
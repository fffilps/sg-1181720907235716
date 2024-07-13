import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import SEO from '@/components/SEO';
import Link from 'next/link';

const dummyApplications = [
  { id: 1, grantTitle: "Environmental Research Grant", status: "Pending" },
  { id: 2, grantTitle: "Tech Innovation Fund", status: "Approved" },
  { id: 3, grantTitle: "Community Development Project", status: "Rejected" },
];

const dummySavedGrants = [
  { id: 1, title: "Medical Research Grant", category: "Health", amount: "$75,000", deadline: "2024-08-31" },
  { id: 2, title: "Arts and Culture Fund", category: "Arts", amount: "$30,000", deadline: "2024-09-15" },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [savedGrants, setSavedGrants] = useState([]);

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

        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {applications.map(app => (
                <li key={app.id} className="flex justify-between items-center">
                  <span>{app.grantTitle}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {app.status}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/applications" passHref>
              <Button className="mt-4">View All Applications</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Grants</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {savedGrants.map(grant => (
                <li key={grant.id} className="flex justify-between items-center">
                  <span>{grant.title}</span>
                  <span className="text-sm text-gray-500">Deadline: {grant.deadline}</span>
                </li>
              ))}
            </ul>
            <Link href="/" passHref>
              <Button className="mt-4">Explore More Grants</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
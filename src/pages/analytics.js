import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SEO from '@/components/SEO';

const dummyAnalyticsData = [
  { name: 'Environmental', applications: 65, awarded: 40 },
  { name: 'Technology', applications: 80, awarded: 35 },
  { name: 'Social', applications: 55, awarded: 30 },
  { name: 'Health', applications: 70, awarded: 45 },
  { name: 'Arts', applications: 45, awarded: 25 },
];

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this data from your backend
    setAnalyticsData(dummyAnalyticsData);
  }, []);

  return (
    <>
      <SEO 
        title="Grant Analytics"
        description="View analytics for grant applications and awards on GrantHub."
        keywords={['analytics', 'grants', 'applications', 'awards', 'statistics']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Grant Analytics</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Applications vs Awards by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                  <Bar dataKey="awarded" fill="#82ca9d" name="Awarded" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Total Applications: {analyticsData.reduce((sum, item) => sum + item.applications, 0)}</li>
              <li>Total Awards: {analyticsData.reduce((sum, item) => sum + item.awarded, 0)}</li>
              <li>Average Success Rate: {((analyticsData.reduce((sum, item) => sum + item.awarded, 0) / analyticsData.reduce((sum, item) => sum + item.applications, 0)) * 100).toFixed(2)}%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
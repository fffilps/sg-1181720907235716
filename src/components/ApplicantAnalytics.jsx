import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { month: 'Jan', applications: 4, approved: 1, rejected: 1 },
  { month: 'Feb', applications: 3, approved: 2, rejected: 0 },
  { month: 'Mar', applications: 5, approved: 1, rejected: 2 },
  { month: 'Apr', applications: 2, approved: 1, rejected: 0 },
  { month: 'May', applications: 6, approved: 2, rejected: 1 },
];

export default function ApplicantAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this data from your backend
    setData(dummyData);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Application Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#8884d8" />
              <Bar dataKey="approved" fill="#82ca9d" />
              <Bar dataKey="rejected" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <p>Total Applications: {data.reduce((sum, item) => sum + item.applications, 0)}</p>
          <p>Approved: {data.reduce((sum, item) => sum + item.approved, 0)}</p>
          <p>Rejected: {data.reduce((sum, item) => sum + item.rejected, 0)}</p>
          <p>Success Rate: {((data.reduce((sum, item) => sum + item.approved, 0) / data.reduce((sum, item) => sum + item.applications, 0)) * 100).toFixed(2)}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SEO from '@/components/SEO';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { format } from 'date-fns';

const dummyAnalyticsData = [
  { name: 'Environmental', applications: 65, awarded: 40 },
  { name: 'Technology', applications: 80, awarded: 35 },
  { name: 'Social', applications: 55, awarded: 30 },
  { name: 'Health', applications: 70, awarded: 45 },
  { name: 'Arts', applications: 45, awarded: 25 },
];

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ from: new Date(2023, 0, 1), to: new Date() });

  useEffect(() => {
    // In a real app, you'd fetch this data from your backend based on the selected filters
    setAnalyticsData(dummyAnalyticsData);
  }, [selectedCategory, dateRange]);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Category,Applications,Awarded\n"
      + analyticsData.map(row => `${row.name},${row.applications},${row.awarded}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "grant_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEO 
        title="Grant Analytics"
        description="View analytics for grant applications and awards on GrantHub."
        keywords={['analytics', 'grants', 'applications', 'awards', 'statistics']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Grant Analytics</h1>
        
        <div className="flex space-x-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Environmental">Environmental</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker
            from={dateRange.from}
            to={dateRange.to}
            onSelect={setDateRange}
          />
          <Button onClick={handleExport}>Export CSV</Button>
        </div>
        
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
              <li>Date Range: {format(dateRange.from, 'PP')} to {format(dateRange.to, 'PP')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
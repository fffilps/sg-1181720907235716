import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SEO from '@/components/SEO';

const dummyApplications = [
  { id: 1, grantTitle: "Environmental Research Grant", status: "Pending", submittedDate: "2024-03-15" },
  { id: 2, grantTitle: "Tech Innovation Fund", status: "Approved", submittedDate: "2024-02-28" },
  { id: 3, grantTitle: "Community Development Project", status: "Rejected", submittedDate: "2024-01-10" },
  { id: 4, grantTitle: "Medical Research Grant", status: "Pending", submittedDate: "2024-03-20" },
  { id: 5, grantTitle: "Arts and Culture Fund", status: "Approved", submittedDate: "2024-03-05" },
  { id: 6, grantTitle: "Education Initiative", status: "Pending", submittedDate: "2024-03-18" },
  { id: 7, grantTitle: "Renewable Energy Project", status: "Rejected", submittedDate: "2024-02-15" },
];

const itemsPerPage = 5;

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(dummyApplications);
      } catch (err) {
        setError('Failed to fetch applications. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to fetch applications. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const filteredApplications = applications.filter(app => 
    statusFilter === 'All' || app.status === statusFilter
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count
  }));

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <SEO 
        title="My Applications"
        description="View and manage your grant applications on GrantHub."
        keywords={['applications', 'grants', 'status', 'management']}
      />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <div className="flex justify-between items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grant Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.grantTitle}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>{app.submittedDate}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Application Status Overview</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";

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
  const [applications, setApplications] = useState(dummyApplications);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');

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

  return (
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
    </div>
  );
}
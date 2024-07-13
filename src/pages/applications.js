import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const dummyApplications = [
  { id: 1, grantTitle: "Environmental Research Grant", status: "Pending", submittedDate: "2024-03-15" },
  { id: 2, grantTitle: "Tech Innovation Fund", status: "Approved", submittedDate: "2024-02-28" },
  { id: 3, grantTitle: "Community Development Project", status: "Rejected", submittedDate: "2024-01-10" },
];

export default function Applications() {
  const [applications, setApplications] = useState(dummyApplications);

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
          {applications.map((app) => (
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
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import SEO from '@/components/SEO';

const dummyGrants = [
  { id: 1, title: "Environmental Research Grant", category: "Environment", amount: "$50,000", deadline: "2024-06-30", status: "Active" },
  { id: 2, title: "Tech Innovation Fund", category: "Technology", amount: "$100,000", deadline: "2024-07-15", status: "Draft" },
  { id: 3, title: "Community Development Project", category: "Social", amount: "$25,000", deadline: "2024-05-31", status: "Closed" },
];

export default function GrantManagement() {
  const [grants, setGrants] = useState(dummyGrants);
  const [newGrant, setNewGrant] = useState({ title: '', category: '', amount: '', deadline: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGrant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const grantToAdd = {
      ...newGrant,
      id: grants.length + 1,
      status: 'Draft'
    };
    setGrants(prev => [...prev, grantToAdd]);
    setNewGrant({ title: '', category: '', amount: '', deadline: '' });
    toast({
      title: "Grant Added",
      description: "Your new grant has been added as a draft.",
    });
  };

  const updateGrantStatus = (id, newStatus) => {
    setGrants(prev => prev.map(grant => 
      grant.id === id ? { ...grant, status: newStatus } : grant
    ));
    toast({
      title: "Grant Updated",
      description: `Grant status has been updated to ${newStatus}.`,
    });
  };

  return (
    <>
      <SEO 
        title="Grant Management"
        description="Manage your grants on GrantHub."
        keywords={['grant management', 'create grant', 'edit grant', 'provider']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Grant Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New Grant</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="title"
                placeholder="Grant Title"
                value={newGrant.title}
                onChange={handleInputChange}
                required
              />
              <Input
                name="category"
                placeholder="Category"
                value={newGrant.category}
                onChange={handleInputChange}
                required
              />
              <Input
                name="amount"
                placeholder="Amount"
                value={newGrant.amount}
                onChange={handleInputChange}
                required
              />
              <Input
                name="deadline"
                type="date"
                value={newGrant.deadline}
                onChange={handleInputChange}
                required
              />
              <Button type="submit">Add Grant</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Grants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grants.map((grant) => (
                  <TableRow key={grant.id}>
                    <TableCell>{grant.title}</TableCell>
                    <TableCell>{grant.category}</TableCell>
                    <TableCell>{grant.amount}</TableCell>
                    <TableCell>{grant.deadline}</TableCell>
                    <TableCell>{grant.status}</TableCell>
                    <TableCell>
                      {grant.status === 'Draft' && (
                        <Button onClick={() => updateGrantStatus(grant.id, 'Active')} size="sm">Publish</Button>
                      )}
                      {grant.status === 'Active' && (
                        <Button onClick={() => updateGrantStatus(grant.id, 'Closed')} size="sm" variant="destructive">Close</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const dummyGrants = [
  { id: 1, title: "Environmental Research Grant", category: "Environment", amount: "$50,000", deadline: "2024-06-30" },
  { id: 2, title: "Tech Innovation Fund", category: "Technology", amount: "$100,000", deadline: "2024-07-15" },
  { id: 3, title: "Community Development Project", category: "Social", amount: "$25,000", deadline: "2024-05-31" },
  { id: 4, title: "Medical Research Grant", category: "Health", amount: "$75,000", deadline: "2024-08-31" },
  { id: 5, title: "Arts and Culture Fund", category: "Arts", amount: "$30,000", deadline: "2024-09-15" },
];

const categories = ["All", ...new Set(dummyGrants.map(grant => grant.category))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGrants = dummyGrants.filter(grant =>
    (grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grant.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || grant.category === selectedCategory)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Grants</h1>
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Search grants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>Reset Filters</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrants.map((grant) => (
          <Card key={grant.id}>
            <CardHeader>
              <CardTitle>{grant.title}</CardTitle>
              <Badge>{grant.category}</Badge>
            </CardHeader>
            <CardContent>
              <p><strong>Amount:</strong> {grant.amount}</p>
              <p><strong>Deadline:</strong> {grant.deadline}</p>
            </CardContent>
            <CardFooter>
              <Button>Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
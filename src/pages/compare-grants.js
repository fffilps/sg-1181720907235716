import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SEO from '@/components/SEO';

// Simulated API call to fetch grants
const fetchGrants = async () => {
  // In a real app, this would be an actual API call
  return [
    { id: 1, title: "Environmental Research Grant", category: "Environment", amount: "$50,000", deadline: "2024-06-30" },
    { id: 2, title: "Tech Innovation Fund", category: "Technology", amount: "$100,000", deadline: "2024-07-15" },
    { id: 3, title: "Community Development Project", category: "Social", amount: "$25,000", deadline: "2024-05-31" },
    { id: 4, title: "Medical Research Grant", category: "Health", amount: "$75,000", deadline: "2024-08-31" },
    { id: 5, title: "Arts and Culture Fund", category: "Arts", amount: "$30,000", deadline: "2024-09-15" },
  ];
};

export default function CompareGrants() {
  const [grants, setGrants] = useState([]);
  const [selectedGrants, setSelectedGrants] = useState(['', '']);
  const router = useRouter();

  useEffect(() => {
    const loadGrants = async () => {
      const fetchedGrants = await fetchGrants();
      setGrants(fetchedGrants);
    };
    loadGrants();
  }, []);

  const handleCompare = () => {
    if (selectedGrants[0] && selectedGrants[1]) {
      router.push(`/grant-comparison?grant1=${selectedGrants[0]}&grant2=${selectedGrants[1]}`);
    }
  };

  return (
    <>
      <SEO 
        title="Compare Grants"
        description="Compare different grants side by side on GrantHub."
        keywords={['compare grants', 'grant comparison', 'funding opportunities']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Compare Grants</h1>
        <div className="flex space-x-4">
          {[0, 1].map((index) => (
            <Select
              key={index}
              value={selectedGrants[index]}
              onValueChange={(value) => {
                const newSelectedGrants = [...selectedGrants];
                newSelectedGrants[index] = value;
                setSelectedGrants(newSelectedGrants);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder={`Select Grant ${index + 1}`} />
              </SelectTrigger>
              <SelectContent>
                {grants.map((grant) => (
                  <SelectItem key={grant.id} value={grant.id.toString()}>
                    {grant.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
        <Button onClick={handleCompare} disabled={!selectedGrants[0] || !selectedGrants[1]}>
          Compare Grants
        </Button>
        {selectedGrants[0] && selectedGrants[1] && (
          <div className="grid grid-cols-2 gap-4">
            {selectedGrants.map((grantId, index) => {
              const grant = grants.find(g => g.id.toString() === grantId);
              return grant ? (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{grant.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Category:</strong> {grant.category}</p>
                    <p><strong>Amount:</strong> {grant.amount}</p>
                    <p><strong>Deadline:</strong> {grant.deadline}</p>
                  </CardContent>
                </Card>
              ) : null;
            })}
          </div>
        )}
      </div>
    </>
  );
}
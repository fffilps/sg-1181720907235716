import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import SEO from '@/components/SEO';

export default function SubmitGrant() {
  const router = useRouter();
  const [grantData, setGrantData] = useState({
    title: '',
    category: '',
    amount: '',
    deadline: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGrantData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the grant data to your backend
    console.log('Submitted grant data:', grantData);
    toast({
      title: "Grant Submitted",
      description: "Your grant has been successfully submitted for review.",
    });
    // Redirect to the home page or a confirmation page
    router.push('/');
  };

  return (
    <>
      <SEO 
        title="Submit a Grant"
        description="Submit a new grant opportunity to GrantHub."
        keywords={['submit grant', 'new grant', 'grant opportunity']}
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Submit a Grant</h1>
        <Card>
          <CardHeader>
            <CardTitle>Grant Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Grant Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={grantData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" value={grantData.category} onValueChange={(value) => setGrantData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Environment">Environment</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Grant Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={grantData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={grantData.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Grant Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={grantData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit">Submit Grant</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
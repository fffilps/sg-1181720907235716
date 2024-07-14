import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SEO from '@/components/SEO';
import MilestoneTracker from '@/components/MilestoneTracker';

// Simulated API call to fetch applicants
const fetchApplicants = async () => {
  // In a real app, this would be an actual API call
  return [
    { id: 1, name: "John Doe", projectTitle: "Eco-Friendly Water Purifier", category: "Environment", fundingNeeded: 50000, projectDeadline: "2024-06-30", milestones: [
      { id: 1, title: "Prototype Development", completed: true },
      { id: 2, title: "Initial Testing", completed: false },
      { id: 3, title: "Manufacturing Setup", completed: false },
    ]},
    { id: 2, name: "Jane Smith", projectTitle: "AI-Powered Education Platform", category: "Technology", fundingNeeded: 100000, projectDeadline: "2024-07-15", milestones: [
      { id: 1, title: "Algorithm Development", completed: true },
      { id: 2, title: "User Interface Design", completed: true },
      { id: 3, title: "Beta Testing", completed: false },
    ]},
    { id: 3, name: "Alex Johnson", projectTitle: "Community Garden Initiative", category: "Social", fundingNeeded: 25000, projectDeadline: "2024-05-31", milestones: [
      { id: 1, title: "Land Acquisition", completed: true },
      { id: 2, title: "Soil Preparation", completed: false },
      { id: 3, title: "Planting Phase", completed: false },
    ]},
  ];
};

export default function CompareApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState(['', '']);
  const router = useRouter();

  useEffect(() => {
    const loadApplicants = async () => {
      const fetchedApplicants = await fetchApplicants();
      setApplicants(fetchedApplicants);
    };
    loadApplicants();
  }, []);

  const handleCompare = () => {
    if (selectedApplicants[0] && selectedApplicants[1]) {
      router.push(`/applicant-comparison?applicant1=${selectedApplicants[0]}&applicant2=${selectedApplicants[1]}`);
    }
  };

  return (
    <>
      <SEO 
        title="Compare Applicants"
        description="Compare different funding applicants side by side on FundHub."
        keywords={['compare applicants', 'funding comparison', 'project comparison']}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Compare Applicants</h1>
        <div className="flex space-x-4">
          {[0, 1].map((index) => (
            <Select
              key={index}
              value={selectedApplicants[index]}
              onValueChange={(value) => {
                const newSelectedApplicants = [...selectedApplicants];
                newSelectedApplicants[index] = value;
                setSelectedApplicants(newSelectedApplicants);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder={`Select Applicant ${index + 1}`} />
              </SelectTrigger>
              <SelectContent>
                {applicants.map((applicant) => (
                  <SelectItem key={applicant.id} value={applicant.id.toString()}>
                    {applicant.name} - {applicant.projectTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
        <Button onClick={handleCompare} disabled={!selectedApplicants[0] || !selectedApplicants[1]}>
          Compare Applicants
        </Button>
        {selectedApplicants[0] && selectedApplicants[1] && (
          <div className="grid grid-cols-2 gap-4">
            {selectedApplicants.map((applicantId, index) => {
              const applicant = applicants.find(a => a.id.toString() === applicantId);
              return applicant ? (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{applicant.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Project:</strong> {applicant.projectTitle}</p>
                    <p><strong>Category:</strong> {applicant.category}</p>
                    <p><strong>Funding Needed:</strong> ${applicant.fundingNeeded}</p>
                    <p><strong>Deadline:</strong> {applicant.projectDeadline}</p>
                    <MilestoneTracker milestones={applicant.milestones} />
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
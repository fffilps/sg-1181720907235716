import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FundingApplicantCard from '@/components/FundingApplicantCard';
import ApplicantSkeleton from '@/components/ApplicantSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

// Simulated API call
const fetchApplicants = async () => {
  // In a real app, this would be an actual API call
  await new Promise(resolve => setTimeout(resolve, 1000));
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
    { id: 4, name: "Emily Brown", projectTitle: "Cancer Detection Wearable", category: "Health", fundingNeeded: 75000, projectDeadline: "2024-08-31", milestones: [
      { id: 1, title: "Sensor Development", completed: true },
      { id: 2, title: "Clinical Trials", completed: false },
      { id: 3, title: "FDA Approval Process", completed: false },
    ]},
    { id: 5, name: "Michael Lee", projectTitle: "Virtual Reality Art Gallery", category: "Arts", fundingNeeded: 30000, projectDeadline: "2024-09-15", milestones: [
      { id: 1, title: "3D Modeling", completed: true },
      { id: 2, title: "VR Interface Development", completed: false },
      { id: 3, title: "Artist Collaborations", completed: false },
    ]},
  ];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const applicants = await fetchApplicants();
  return {
    props: {
      initialApplicants: applicants,
    },
  };
};

const categories = ["All", "Environment", "Technology", "Social", "Health", "Arts"];

export default function Home({ initialApplicants }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [fundingRange, setFundingRange] = useState([0, 100000]);
  const [isLoading, setIsLoading] = useState(false);
  const [applicants, setApplicants] = useState(initialApplicants);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const filterApplicants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const filteredApplicants = applicants.filter(applicant =>
          (applicant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          applicant.projectTitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
          (selectedCategory === 'All' || applicant.category === selectedCategory) &&
          (applicant.fundingNeeded >= fundingRange[0] && applicant.fundingNeeded <= fundingRange[1])
        );
        setApplicants(filteredApplicants);
      } catch (err) {
        setError('Failed to filter applicants. Please try again.');
        toast({
          title: "Error",
          description: "Failed to filter applicants. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    filterApplicants();
  }, [debouncedSearchTerm, selectedCategory, fundingRange, toast]);

  const highlightSearchTerm = (text, term) => {
    if (!term.trim()) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark> : part
    );
  };

  return (
    <>
      <SEO 
        title="Funding Applicants"
        description="Explore and support innovative projects and their creators on FundHub."
        keywords={['funding', 'applicants', 'projects', 'innovation', 'support']}
      />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Funding Applicants</h1>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"
            placeholder="Search applicants or projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            aria-label="Search applicants or projects"
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
          <div className="w-full max-w-xs">
            <label htmlFor="funding-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Funding Range: ${fundingRange[0]} - ${fundingRange[1]}
            </label>
            <Slider
              id="funding-range"
              min={0}
              max={100000}
              step={1000}
              value={fundingRange}
              onValueChange={setFundingRange}
              className="mt-2"
            />
          </div>
          <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setFundingRange([0, 100000]);}}>Reset Filters</Button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isLoading
              ? Array(6).fill().map((_, index) => <ApplicantSkeleton key={index} />)
              : applicants.length > 0
                ? applicants.map((applicant) => (
                    <FundingApplicantCard 
                      key={applicant.id} 
                      applicant={{
                        ...applicant,
                        name: highlightSearchTerm(applicant.name, searchTerm),
                        projectTitle: highlightSearchTerm(applicant.projectTitle, searchTerm)
                      }} 
                    />
                  ))
                : <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No applicants found matching your criteria.</div>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
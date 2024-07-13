import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GrantCard from '@/components/GrantCard';
import GrantSkeleton from '@/components/GrantSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

// Simulated API call
const fetchGrants = async () => {
  // In a real app, this would be an actual API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, title: "Environmental Research Grant", category: "Environment", amount: 50000, deadline: "2024-06-30" },
    { id: 2, title: "Tech Innovation Fund", category: "Technology", amount: 100000, deadline: "2024-07-15" },
    { id: 3, title: "Community Development Project", category: "Social", amount: 25000, deadline: "2024-05-31" },
    { id: 4, title: "Medical Research Grant", category: "Health", amount: 75000, deadline: "2024-08-31" },
    { id: 5, title: "Arts and Culture Fund", category: "Arts", amount: 30000, deadline: "2024-09-15" },
  ];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const grants = await fetchGrants();
  return {
    props: {
      initialGrants: grants,
    },
  };
};

const categories = ["All", "Environment", "Technology", "Social", "Health", "Arts"];

export default function Home({ initialGrants }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [amountRange, setAmountRange] = useState([0, 100000]);
  const [isLoading, setIsLoading] = useState(false);
  const [grants, setGrants] = useState(initialGrants);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const filterGrants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const filteredGrants = grants.filter(grant =>
          (grant.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          grant.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
          (selectedCategory === 'All' || grant.category === selectedCategory) &&
          (grant.amount >= amountRange[0] && grant.amount <= amountRange[1])
        );
        setGrants(filteredGrants);
      } catch (err) {
        setError('Failed to filter grants. Please try again.');
        toast({
          title: "Error",
          description: "Failed to filter grants. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    filterGrants();
  }, [debouncedSearchTerm, selectedCategory, amountRange, toast]);

  const highlightSearchTerm = (text, term) => {
    if (!term.trim()) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark> : part
    );
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <SEO 
        title="Available Grants"
        description="Explore and apply for a wide range of grants across various categories on GrantHub."
        keywords={['grants', 'funding', 'research', 'innovation', 'community development']}
      />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Available Grants</h1>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"
            placeholder="Search grants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            aria-label="Search grants"
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
            <label htmlFor="amount-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount Range: ${amountRange[0]} - ${amountRange[1]}
            </label>
            <Slider
              id="amount-range"
              min={0}
              max={100000}
              step={1000}
              value={amountRange}
              onValueChange={setAmountRange}
              className="mt-2"
            />
          </div>
          <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('All'); setAmountRange([0, 100000]);}}>Reset Filters</Button>
        </div>
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isLoading
              ? Array(6).fill().map((_, index) => <GrantSkeleton key={index} />)
              : grants.length > 0
                ? grants.map((grant) => (
                    <GrantCard 
                      key={grant.id} 
                      grant={{
                        ...grant,
                        title: highlightSearchTerm(grant.title, searchTerm)
                      }} 
                    />
                  ))
                : <div className="col-span-full text-center text-gray-500 dark:text-gray-400">No grants found matching your criteria.</div>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GrantCard from '@/components/GrantCard';
import GrantSkeleton from '@/components/GrantSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";

const dummyGrants = [
  { id: 1, title: "Environmental Research Grant", category: "Environment", amount: "$50,000", deadline: "2024-06-30" },
  { id: 2, title: "Tech Innovation Fund", category: "Technology", amount: "$100,000", deadline: "2024-07-15" },
  { id: 3, title: "Community Development Project", category: "Social", amount: "$25,000", deadline: "2024-05-31" },
  { id: 4, title: "Medical Research Grant", category: "Health", amount: "$75,000", deadline: "2024-08-31" },
  { id: 5, title: "Arts and Culture Fund", category: "Arts", amount: "$30,000", deadline: "2024-09-15" },
];

const featuredGrants = dummyGrants.slice(0, 3);

const categories = ["All", ...new Set(dummyGrants.map(grant => grant.category))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [grants, setGrants] = useState([]);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchGrants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGrants(dummyGrants);
      } catch (err) {
        setError('Failed to fetch grants. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to fetch grants. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrants();
  }, [toast]);

  const filteredGrants = useMemo(() => {
    return grants.filter(grant =>
      (grant.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      grant.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || grant.category === selectedCategory)
    );
  }, [grants, debouncedSearchTerm, selectedCategory]);

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
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Grants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredGrants.map(grant => (
              <GrantCard key={grant.id} grant={grant} />
            ))}
          </div>
        </section>

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
          <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}>Reset Filters</Button>
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
              : filteredGrants.length > 0
                ? filteredGrants.map((grant) => (
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
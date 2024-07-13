import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function SavedSearches({ onApplySearch }) {
  const [savedSearches, setSavedSearches] = useState([]);
  const [newSearchName, setNewSearchName] = useState('');

  useEffect(() => {
    // Load saved searches from localStorage
    const loadedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSavedSearches(loadedSearches);
  }, []);

  const saveCurrentSearch = () => {
    if (!newSearchName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your search.",
        variant: "destructive",
      });
      return;
    }

    const currentSearch = {
      name: newSearchName,
      searchTerm: sessionStorage.getItem('lastSearchTerm') || '',
      category: sessionStorage.getItem('lastCategory') || 'All',
    };

    const updatedSearches = [...savedSearches, currentSearch];
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
    setNewSearchName('');

    toast({
      title: "Search Saved",
      description: "Your search preferences have been saved.",
    });
  };

  const applySearch = (search) => {
    onApplySearch(search.searchTerm, search.category);
    toast({
      title: "Search Applied",
      description: `Applied search: ${search.name}`,
    });
  };

  const deleteSearch = (index) => {
    const updatedSearches = savedSearches.filter((_, i) => i !== index);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
    toast({
      title: "Search Deleted",
      description: "The saved search has been removed.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Searches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Name your current search"
              value={newSearchName}
              onChange={(e) => setNewSearchName(e.target.value)}
              aria-label="Name your current search"
            />
            <Button onClick={saveCurrentSearch}>Save Current Search</Button>
          </div>
          {savedSearches.map((search, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{search.name}</span>
              <div>
                <Button variant="outline" onClick={() => applySearch(search)} className="mr-2">
                  Apply
                </Button>
                <Button variant="destructive" onClick={() => deleteSearch(index)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
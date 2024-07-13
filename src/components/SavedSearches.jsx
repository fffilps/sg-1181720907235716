import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SavedSearches({ onApplySearch }) {
  const [savedSearches, setSavedSearches] = useState([]);
  const [newSearchName, setNewSearchName] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);

  useEffect(() => {
    // Load saved searches from localStorage
    const loadedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSavedSearches(loadedSearches);
    setEmailNotifications(JSON.parse(localStorage.getItem('emailNotifications') || 'false'));
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

  const toggleEmailNotifications = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    localStorage.setItem('emailNotifications', JSON.stringify(newValue));
    toast({
      title: newValue ? "Email Notifications Enabled" : "Email Notifications Disabled",
      description: newValue ? "You will receive email notifications for new grants matching your saved searches." : "You will no longer receive email notifications for new grants.",
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
          <div className="flex items-center space-x-2">
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={toggleEmailNotifications}
            />
            <Label htmlFor="email-notifications">Receive email notifications for new matching grants</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
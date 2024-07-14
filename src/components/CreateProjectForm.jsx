import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const CreateProjectForm = ({ onProjectCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    projectTitle: '',
    category: '',
    fundingNeeded: '',
    projectDeadline: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prevData => ({ ...prevData, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      id: Date.now(),
      milestones: [
        { id: 1, title: "Project Start", completed: true },
        { id: 2, title: "Midway Review", completed: false },
        { id: 3, title: "Final Submission", completed: false },
      ],
    };
    onProjectCreated(newProject);
    toast({
      title: "Project Created",
      description: "Your new project has been added to the list of applicants.",
    });
    setFormData({
      name: '',
      projectTitle: '',
      category: '',
      fundingNeeded: '',
      projectDeadline: '',
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange} value={formData.category}>
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
            <Label htmlFor="fundingNeeded">Funding Needed</Label>
            <Input
              id="fundingNeeded"
              name="fundingNeeded"
              type="number"
              value={formData.fundingNeeded}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectDeadline">Project Deadline</Label>
            <Input
              id="projectDeadline"
              name="projectDeadline"
              type="date"
              value={formData.projectDeadline}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit">Create Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectForm;
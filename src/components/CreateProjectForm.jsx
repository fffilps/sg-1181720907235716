import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  projectTitle: z.string().min(5, { message: "Project title must be at least 5 characters long" }),
  category: z.string().min(1, { message: "Please select a category" }),
  fundingNeeded: z.number().min(1000, { message: "Funding needed must be at least $1,000" }),
  projectDeadline: z.string().refine((date) => new Date(date) > new Date(), { message: "Deadline must be in the future" }),
});

const CreateProjectForm = ({ onProjectCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(schema)
  });

  const formatFunding = (value) => {
    const number = parseFloat(value.replace(/[^\d.-]/g, ''));
    if (isNaN(number)) return '$';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newProject = {
        ...data,
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
      reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title</Label>
            <Input
              id="projectTitle"
              {...register("projectTitle")}
              aria-invalid={errors.projectTitle ? "true" : "false"}
            />
            {errors.projectTitle && <p className="text-red-500 text-sm">{errors.projectTitle.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
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
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fundingNeeded">Funding Needed</Label>
            <Input
              id="fundingNeeded"
              {...register("fundingNeeded", {
                setValueAs: (v) => parseFloat(v.replace(/[^\d.-]/g, '')),
                onChange: (e) => {
                  e.target.value = formatFunding(e.target.value);
                },
              })}
              aria-invalid={errors.fundingNeeded ? "true" : "false"}
            />
            {errors.fundingNeeded && <p className="text-red-500 text-sm">{errors.fundingNeeded.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectDeadline">Project Deadline</Label>
            <Input
              id="projectDeadline"
              type="date"
              {...register("projectDeadline")}
              aria-invalid={errors.projectDeadline ? "true" : "false"}
            />
            {errors.projectDeadline && <p className="text-red-500 text-sm">{errors.projectDeadline.message}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectForm;
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import SEO from '@/components/SEO';

const schema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters long" }),
  category: z.string().min(1, { message: "Please select a category" }),
  amount: z.string().regex(/^\$?\d+(\.\d{1,2})?$/, { message: "Please enter a valid amount" }),
  deadline: z.string().refine((date) => new Date(date) > new Date(), { message: "Deadline must be in the future" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters long" }),
});

export default function SubmitGrant() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    // Here you would typically send the grant data to your backend
    console.log('Submitted grant data:', data);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Grant Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
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
                {errors.category && <p className="text-red-500">{errors.category.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Grant Amount</Label>
                <Input
                  id="amount"
                  {...register("amount")}
                  aria-invalid={errors.amount ? "true" : "false"}
                />
                {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  {...register("deadline")}
                  aria-invalid={errors.deadline ? "true" : "false"}
                />
                {errors.deadline && <p className="text-red-500">{errors.deadline.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Grant Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  aria-invalid={errors.description ? "true" : "false"}
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </div>
              <Button type="submit">Submit Grant</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
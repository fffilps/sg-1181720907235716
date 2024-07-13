import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

export default function GrantReview({ grantId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the review data to your backend
    console.log('Submitted review:', { grantId, rating, review });
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    // Reset the form
    setRating(0);
    setReview('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
                onKeyDown={(e) => e.key === 'Enter' && setRating(star)}
                tabIndex={0}
                role="button"
                aria-label={`Rate ${star} stars`}
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
}
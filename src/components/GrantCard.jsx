import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function GrantCard({ grant }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{grant.title}</CardTitle>
        <Badge>{grant.category}</Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>Amount:</strong> {grant.amount}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Deadline:</strong> {grant.deadline}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  );
}
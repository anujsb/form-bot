import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MessageCircle, Star } from "lucide-react";
import { db } from "../db";

export const Widget = ({ projectId }) => {
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target;
      const data = {
        p_project_id: projectId,
        p_user_name: form.name.value,
        p_user_email: form.email.value,
        p_message: form.feedback.value,
        p_rating: rating,
      };
      
      const { data: returnedData, error } = await db.rpc("add_feedback", data);
      
      if (error) {
        console.error("Error submitting feedback:", error);
        return;
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed z-50 bottom-4 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="transition-transform rounded-full shadow-lg hover:scale-105">
            <MessageCircle className="w-5 h-5 mr-2" />
            Feedback
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-4 rounded-lg shadow-lg bg-card">
          {submitted ? (
            <div>
              <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
              <p className="mt-4">
                We appreciate your feedback. It helps us improve our product and provide better
                service to our customers.
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold">Send us your feedback</h3>
              <form
                className="mt-4 space-y-4"
                onSubmit={submit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Tell us what you think"
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 cursor-pointer ${
                          rating > index ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                        onClick={() => onSelectStar(index)}
                      />
                    ))}
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          )}
          <Separator className="my-4" />
          <div className="text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              21bubbles
            </a>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
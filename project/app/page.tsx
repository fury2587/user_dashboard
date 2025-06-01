import Link from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, Home } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-[800px] mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          User Dashboard Demo
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          A beautiful, responsive dashboard displaying user information with search and pagination features.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <a href="/dashboard">
              <Users className="h-5 w-5" />
              View Dashboard
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export function AIButton({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  const aiFeatures = [
    {
      title: "Smart Organization",
      description: "Auto-categorize your files",
      icon: "🗂️"
    },
    {
      title: "Duplicate Detection",
      description: "Find and remove duplicates",
      icon: "🔍"
    },
    {
      title: "Smart Search",
      description: "AI-powered file discovery",
      icon: "🧠"
    },
    {
      title: "File Insights",
      description: "Get usage analytics",
      icon: "📊"
    }
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          size="sm" 
          className={`gradient-primary text-white shadow-lg hover:shadow-glow transition-all duration-300 relative ${className}`}
        >
          <Brain className="mr-2 h-4 w-4" />
          AI Features
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full animate-pulse"></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              AI Assistant
            </h4>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Active
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Intelligent features to enhance your workflow
          </p>
        </div>
        
        <div className="p-2">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth"
            >
              <span className="text-lg">{feature.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{feature.title}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <Button className="w-full gradient-ai text-primary" variant="outline">
            <Brain className="mr-2 h-4 w-4" />
            Open AI Dashboard
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

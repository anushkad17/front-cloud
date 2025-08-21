import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles, Search, AlertTriangle, FolderOpen } from "lucide-react";

export function AIPanel() {
  const aiInsights = [
    {
      type: "duplicate",
      icon: AlertTriangle,
      title: "Duplicate Files Detected",
      description: "5 duplicate files found (2.1 GB)",
      action: "Clean up",
      variant: "destructive",
    },
    {
      type: "category",
      icon: FolderOpen,
      title: "Auto-categorization",
      description: "23 files organized into Smart Folders",
      action: "Review",
      variant: "default",
    },
    {
      type: "recommendation",
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Suggested file organization improvements",
      action: "Apply",
      variant: "secondary",
    },
  ];

  const smartSearchSuggestions = [
    "Photos from last vacation",
    "Documents modified this week",
    "Large video files",
    "Presentations by John",
  ];

  return (
    <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <div className="h-8 w-8 gradient-ai rounded-lg flex items-center justify-center">
            <Brain className="h-4 w-4 text-primary" />
          </div>
          <span>AI Assistant</span>
        </CardTitle>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Sparkles className="mr-1 h-3 w-3" />
          Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Smart Insights</h4>
          <div className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`mt-0.5 h-6 w-6 rounded-md flex items-center justify-center ${
                      insight.variant === "destructive"
                        ? "bg-destructive/10"
                        : insight.variant === "secondary"
                        ? "bg-secondary"
                        : "bg-primary/10"
                    }`}
                  >
                    <insight.icon
                      className={`h-3 w-3 ${
                        insight.variant === "destructive"
                          ? "text-destructive"
                          : insight.variant === "secondary"
                          ? "text-secondary-foreground"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{insight.title}</div>
                    <div className="text-xs text-muted-foreground">{insight.description}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={insight.variant}
                  className="text-xs transition-smooth"
                >
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Smart Search Suggestions</span>
          </h4>
          <div className="space-y-2">
            {smartSearchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left p-2 text-xs bg-muted/30 hover:bg-muted/50 rounded-md transition-smooth text-muted-foreground hover:text-foreground"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full hover:bg-primary/5 hover:border-primary transition-smooth"
          >
            <Brain className="mr-2 h-4 w-4" />
            View All AI Features
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

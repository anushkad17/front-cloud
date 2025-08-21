import { DashboardLayout } from "@/components/layout/DashboardLayout";
import FileUpload from "@/components/dashboard/FileUpload";
import FileList from "@/components/dashboard/FileList";
import { StorageUsage } from "@/components/dashboard/StorageUsage";
import { AIPanel } from "@/components/dashboard/AIPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/auth";
import { useEffect, useState } from "react";

import { 
  FileIcon,
  TrendingUp,
  Users,
  Cloud,
  Image,
  Video,
  Music,
  FileText,
  Lightbulb,
  Recycle,
  Zap,
  FolderOpen
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const u = await getCurrentUser();
        setUser(u);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  const stats = [
    {
      title: "Total Files",
      value: "1,247",
      change: "+12%",
      icon: FileIcon,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Storage Used",
      value: "45.2 GB",
      change: "+8%", 
      icon: Cloud,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Shared Files",
      value: "89",
      change: "+24%",
      icon: Users,
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "AI Insights",
      value: "23",
      change: "+15%",
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  const storageOverview = [
    { type: "Photos", count: "120 files", size: "10GB of 500GB", progress: 20, icon: Image, color: "text-green-500" },
    { type: "Videos", count: "80 files", size: "20GB of 500GB", progress: 40, icon: Video, color: "text-purple-500" },
    { type: "Music", count: "150 files", size: "5GB of 500GB", progress: 10, icon: Music, color: "text-orange-500" },
    { type: "Documents", count: "200 files", size: "15GB of 500GB", progress: 30, icon: FileText, color: "text-blue-500" },
  ];

  const aiSuggestions = [
    {
      icon: Lightbulb,
      title: "Smart organization tips",
      description: "To help organize files more efficiently, optimize your storage",
      action: "Learn More",
      color: "text-yellow-500"
    },
    {
      icon: Recycle,
      title: "Research paper",
      description: "This document presents new research methods and findings",
      action: "Upgrade Plan",
      color: "text-green-500"
    },
    {
      icon: FolderOpen,
      title: "Quarterly review.pptx", 
      description: "A detailed overview of the Q3 performance for the New York office",
      action: "Review",
      color: "text-blue-500"
    }
  ];

  return (
    <DashboardLayout title="Storage Overview" showAIButton={true}>
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Welcome back, {user ? user.name : "Loading..."} 👋
          </h2>
          {user && <p className="text-muted-foreground">Email: {user.email}</p>}
          <p className="text-muted-foreground">
            Here's what's happening with your cloud storage today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden bg-gradient-to-br from-card/50 to-accent/10 border-accent/20 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Badge variant="secondary" className="mt-1 bg-success/10 text-success border-success/20">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Storage Overview Section */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl">Storage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {storageOverview.map((item, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/20">
                  <div className="flex items-center space-x-2">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{item.count.split(" ")[0]}</div>
                    <div className="text-sm text-muted-foreground">{item.count}</div>
                    <div className="text-xs text-muted-foreground">{item.size}</div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions Section */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>AI Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20">
                  <div className="flex items-center space-x-2">
                    <suggestion.icon className={`h-5 w-5 ${suggestion.color}`} />
                    <span className="font-medium text-sm">{suggestion.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {suggestion.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - File Upload & File List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <FileUpload />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "600ms" }}>
              <FileList />
            </div>
          </div>

          {/* Right Column - Storage & AI Panel */}
          <div className="space-y-8">
            <div className="animate-slide-up" style={{ animationDelay: "800ms" }}>
              <StorageUsage />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "1000ms" }}>
              <AIPanel />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

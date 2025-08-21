import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import {
  Mail,
  Calendar,
  MapPin,
  Crown,
  HardDrive,
  FileText,
  Image,
  Video,
  Music,
  Camera,
  Edit,
  Save,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import API from "@/api/axios";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { toast } = useToast();

  // ✅ Fetch user profile
  useEffect(() => {
    API.get("/user/me")
      .then((res) => setProfileData(res.data))
      .catch((err) => {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to fetch profile data.",
          variant: "destructive",
        });
      });
  }, []);

  // ✅ Save profile changes
  const handleSave = () => {
    API.put("/user/update", profileData)
      .then(() => {
        setIsEditing(false);
        toast({
          title: "Profile Updated",
          description: "Your profile information has been saved successfully.",
        });
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive",
        })
      );
  };

  const handleUpgradeClick = () => {
    toast({
      title: "Upgrade Plan",
      description: "Upgrade functionality would be implemented here.",
    });
  };

  if (!profileData) {
    return (
      <DashboardLayout title="Profile" showAIButton={true}>
        <div className="p-6 text-center">Loading profile...</div>
      </DashboardLayout>
    );
  }

  const storageBreakdown = [
    { type: "Documents", count: "200 files", size: "15GB", color: "bg-blue-500", icon: FileText },
    { type: "Photos", count: "120 files", size: "10GB", color: "bg-green-500", icon: Image },
    { type: "Videos", count: "80 files", size: "20GB", color: "bg-purple-500", icon: Video },
    { type: "Music", count: "150 files", size: "5GB", color: "bg-orange-500", icon: Music },
  ];

  return (
    <DashboardLayout title="Profile" showAIButton={true}>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-card/50 to-accent/10 border-accent/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-primary/20">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name} />
                      <AvatarFallback className="gradient-primary text-white text-lg">
                        {profileData.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 gradient-primary"
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold">{profileData.name}</h2>
                      <Badge className="gradient-primary text-white">
                        <Crown className="mr-1 h-3 w-3" />
                        Pro
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">@{profileData.username}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{profileData.location || "Unknown"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  className={isEditing ? "gradient-primary text-white" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            {/* Editable Content */}
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location || ""}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-md bg-background"
                      value={profileData.bio || ""}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">{profileData.bio || "No bio available"}</p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profileData.joinDate || "N/A"}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Storage Usage */}
          <Card className="bg-gradient-to-br from-card/50 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-primary" />
                <span>Storage Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">150 GB</div>
                <div className="text-sm text-muted-foreground">of 200 GB used</div>
                <Progress value={75} className="h-2" />
              </div>

              <Separator />

              <div className="space-y-3">
                {storageBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.size}</div>
                      <div className="text-xs text-muted-foreground">{item.count}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleUpgradeClick} className="w-full gradient-primary text-white">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

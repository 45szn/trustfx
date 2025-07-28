import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProfileSettings = () => {
  const { user } = useAuth();

  // Mock state for profile settings
  const [profile, setProfile] = useState({
    fullName: user?.displayName || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "123-456-7890",
    country: "USA",
    profilePhoto: user?.photoURL || "/placeholder.svg?height=100&width=100",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = (section: string) => {
    // Simulate saving changes
    console.log(`Saving ${section} changes...`);
    // In a real app, you'd send this data to your backend
    alert(`${section} settings saved!`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <p className="text-sm text-gray-600">
          Update your personal details and profile picture.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={profile.profilePhoto || "/placeholder.svg"}
              alt="Profile Picture"
            />
            <AvatarFallback>{profile.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
          >
            <Camera className="h-4 w-4" />
            <span>Change Photo</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={profile.email}
              disabled
              className="bg-gray-100 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Verified
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={profile.country}
              onChange={handleProfileChange}
            />
          </div>
        </div>
        <Button onClick={() => handleSaveChanges("Profile")}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

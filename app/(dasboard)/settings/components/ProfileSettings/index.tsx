"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      const data = userSnap.exists() ? userSnap.data().profile : null;

      setProfile({
        fullName: data?.fullName || user.displayName || "",
        email: user.email || "",
        phone: data?.phone || "",
        country: data?.country || "",
        profilePhoto: data?.profilePhoto || user.photoURL || "/placeholder.svg",
      });

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          profile: {
            fullName: profile.fullName,
            phone: profile.phone,
            country: profile.country,
            profilePhoto: profile.profilePhoto,
          },
        },
        { merge: true },
      );

      alert("Profile settings saved!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong. Try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center p-6">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading profile settings...
      </div>
    );

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
            <AvatarImage src={profile.profilePhoto} alt="Profile Picture" />
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
              className="border border-gray-500 w-5/6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={profile.email}
              disabled
              className="bg-gray-100 cursor-not-allowed border border-gray-500 w-5/6"
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
              className="border border-gray-500 w-5/6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={profile.country}
              onChange={handleProfileChange}
              className="border border-gray-500 w-5/6"
            />
          </div>
        </div>
        <Button onClick={handleSaveChanges}>
          {loading ? (
            <Loader2 className="animate-spin h-6 w-6 mr-2" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

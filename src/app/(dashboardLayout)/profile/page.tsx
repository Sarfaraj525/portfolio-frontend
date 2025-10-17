"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast, Toaster } from "react-hot-toast";

interface User {
  name: string;
  email: string;
  phone: string;
  bio?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch logged-in user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get<{ data: User }>(
          "https://portfolio-backend-production.up.railway.app/api/users/me",
          { withCredentials: true } 
        );
        setUser(data.data);
        setFormData(data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save updated user info to backend
  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required!");
      return;
    }

    try {
      const { data } = await axios.put<{ data: User }>(
        "https://portfolio-backend-production.up.railway.app/api/users/me",
        formData,
        { withCredentials: true }
      );
      setUser(data.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading profile information...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-right" />

      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            User Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!isEditing ? (
            // ✅ View Mode
            <div className="space-y-4">
              <div>
                <Label className="text-gray-500">Name</Label>
                <p className="text-lg font-medium">{user.name}</p>
              </div>

              <div>
                <Label className="text-gray-500">Email</Label>
                <p className="text-lg font-medium">{user.email}</p>
              </div>

              <div>
                <Label className="text-gray-500">Phone</Label>
                <p className="text-lg font-medium">{user.phone}</p>
              </div>

              {user.bio && (
                <div>
                  <Label className="text-gray-500">Bio</Label>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
              )}

              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            // ✅ Edit Mode
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a short bio..."
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

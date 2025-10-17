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

  // ✅ Save updated user info
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
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 py-6 flex justify-center items-start">
      <Toaster position="top-right" />

      <Card className="w-full max-w-2xl shadow-lg border border-gray-200 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center md:text-left">
            User Profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          {!isEditing ? (
            // ✅ View Mode
            <div className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500 text-sm">Name</Label>
                  <p className="text-lg font-medium text-gray-800 mt-1">
                    {user.name}
                  </p>
                </div>

                <div>
                  <Label className="text-gray-500 text-sm">Email</Label>
                  <p className="text-lg font-medium text-gray-800 mt-1">
                    {user.email}
                  </p>
                </div>

                <div>
                  <Label className="text-gray-500 text-sm">Phone</Label>
                  <p className="text-lg font-medium text-gray-800 mt-1">
                    {user.phone}
                  </p>
                </div>

                {user.bio && (
                  <div className="sm:col-span-2">
                    <Label className="text-gray-500 text-sm">Bio</Label>
                    <p className="text-gray-700 mt-1 leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          ) : (
            // ✅ Edit Mode
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a short bio..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 pt-2">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="w-full sm:w-auto"
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

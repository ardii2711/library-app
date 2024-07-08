import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deleteProfile, getProfile, updateProfile } from "@/utils/apis/users";
import { ProfileSchema } from "@/utils/types/users";

const EditProfile = () => {
  const [data, setData] = useState<ProfileSchema>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getProfile();
      const profile = response.payload;

      setData({
        address: profile.address,
        email: profile.email,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
      });
    } catch (error) {
      alert(error);
    }
  }

  async function handleUpdate() {
    try {
      const response = await updateProfile(data!);

      alert(response.message);
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete() {
    try {
      const response = await deleteProfile();

      alert(response.message);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <div className="flex justify-center my-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" defaultValue={data?.full_name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" defaultValue={data?.email} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Enter your password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter your phone number" defaultValue={data?.phone_number} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                className="min-h-[100px]"
                defaultValue={data?.address}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-picture">Profile Picture</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 flex justify-center object-cover overflow-hidden items-center bg-slate-100 rounded-full">
                  <AvatarImage src={"/placeholder-user.jpg"} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <FaUpload className="h-4 w-4 mr-2" />
                  Upload New Photo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="destructive" onClick={() => handleDelete()}>
              Delete Account
            </Button>
            <Button onClick={() => handleUpdate()}>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default EditProfile;

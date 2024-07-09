import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BorrowBookCard from "@/components/borrow-book-card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import { ProfileType } from "@/utils/types/users";
import { IBorrow } from "@/utils/types/borrows";

import { getBorrows } from "@/utils/apis/borrows";
import { getProfile } from "@/utils/apis/users";

function Profile() {
  const [data, setData] = useState<ProfileType>();
  const [borrow, setBorrow] = useState<IBorrow[]>([]);

  useEffect(() => {
    fetchData();
    fetchBorrows();
  }, []);

  function formatDate(dateString: string) {
    return dateString.split('T')[0];
  }

  async function fetchData() {
    try {
      const response = await getProfile();
      setData(response.payload);
    } catch (error) {
      alert(error);
    }
  }

  async function fetchBorrows() {
    try {
      const response = await getBorrows();
      setBorrow(response.payload.datas);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <div className="bg-background text-foreground rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#F0F4F8] h-32 relative">
          <div className="absolute -bottom-16 left-6">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={data?.profile_picture.length !== 0 ? data?.profile_picture : "placeholder.svg"} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="pt-20 px-6 pb-6 grid gap-4">
          <div className="grid gap-1">
            <h2 className="text-2xl font-bold">{data?.full_name}</h2>
            <p className="text-muted-foreground">{data?.email}</p>
          </div>
          <Button variant="outline" className="justify-self-end">
            <Link to={"/profile/edit"}>Edit Profile</Link>
          </Button>
          <Separator />
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Address</h3>
            <div className="grid gap-2">
              <div>{data?.address}</div>
              <div>Phone: {data?.phone_number}</div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Borrowed Books</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {borrow.map((borrow) => (
                <BorrowBookCard
                  key={borrow.id}
                  title={borrow.book.title}
                  cover_image={borrow.book.cover_image}
                  due_date={formatDate(borrow.due_date)}
                  borrow_date={formatDate(borrow.borrow_date)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

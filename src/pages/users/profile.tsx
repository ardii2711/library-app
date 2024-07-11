import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'sonner';

import BorrowBookCard from '@/components/borrow-book-card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';

import { getBorrows } from '@/utils/apis/borrows';
import { useToken } from '@/utils/contexts/token';
import { IBorrow } from '@/utils/types/borrows';

function Profile() {
  const { user } = useToken();
  const [borrow, setBorrow] = useState<IBorrow[]>([]);

  useEffect(() => {
    fetchBorrows();
  }, []);

  async function fetchBorrows() {
    try {
      const response = await getBorrows();
      setBorrow(response.payload.datas);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const formattedDate = (date: string) => format(new Date(date), 'dd MMM yyyy');

  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-1 shadow-lg">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
                <img src={user?.profile_picture} alt="User Profile" width={96} height={96} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid gap-1 text-center">
              <div className="text-lg sm:text-xl font-bold">{user?.full_name}</div>
              <div className="text-sm sm:text-base text-secondary-foreground">{user?.email}</div>
              <div className="text-sm sm:text-base text-secondary-foreground">{user?.address}</div>
              <div className="text-sm sm:text-base text-secondary-foreground">{user?.phone_number}</div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Link to="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
          <Separator className="w-full" />
          {user?.role === 'user' ? (
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Borrowed Books</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {borrow.map((borrow) => (
                  <BorrowBookCard
                    key={borrow.id}
                    title={borrow.book.title}
                    cover_image={borrow.book.cover_image}
                    due_date={formattedDate(borrow.due_date)}
                    borrow_date={formattedDate(borrow.borrow_date)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Admin Shortcuts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <Link to={'/dashboard/books'}>Edit Book</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Link to={'/dashboard/borrows'}>Edit Borrow</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

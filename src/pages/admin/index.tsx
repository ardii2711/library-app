import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout';

import AdminBooks from './admin-books';
import AdminBorrows from './admin-borrows';

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.split('/')[2] || 'books';

  useEffect(() => {
    navigate(`/dashboard/${currentTab}`);
  }, [currentTab, navigate]);

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/${value}`);
  };

  return (
    <Layout>
      <main className="flex-1 p-6">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="borrows">Borrow</TabsTrigger>
          </TabsList>
          <TabsContent value="books">
            <AdminBooks />
          </TabsContent>
          <TabsContent value="borrows">
            <AdminBorrows />
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}

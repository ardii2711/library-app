import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout';

import AdminBooks from './admin-books';
import AdminBorrows from './admin-borrows';

export default function Admin() {
  return (
    <Layout>
      <main className="flex-1 p-6">
        <Tabs defaultValue="books">
          <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="borrow">Borrow</TabsTrigger>
          </TabsList>
          <TabsContent value="books">
            <AdminBooks />
          </TabsContent>
          <TabsContent value="borrow">
            <AdminBorrows />
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}

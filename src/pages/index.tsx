import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookCard from '@/components/book-card';
import Layout from '@/components/layout';

import { getBooks } from '@/utils/apis/books';
import { IBook } from '@/utils/types/books';

export default function Index() {
  const [data, setData] = useState<IBook[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getBooks();
      setData(response.payload.datas);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <main className="flex-1">
        <section className="bg-primary/10 py-16 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4 md:text-4xl lg:text-5xl">Discover Your Next Great Read</h1>
          <p className="text-muted-foreground mb-8 max-w-xl">
            BookQuest is your ultimate book search and recommendation platform. Find your next favorite book with ease.
          </p>
          <div className="flex items-center gap-4 w-full max-w-md">
            <Input type="text" placeholder="Search for a book..." className="flex-1 bg-white" />
            <Button>Search</Button>
          </div>
        </section>
        <section className="py-12 px-6 md:px-12 lg:px-20">
          <h2 className="text-2xl font-bold mb-6">Recommended Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.map((book) => (
              <BookCard key={book.id} data={book} navigate={`/books/${book.id}`} data-testid={`book-${book.id}`} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

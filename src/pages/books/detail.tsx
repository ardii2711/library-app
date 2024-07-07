import Layout from "@/components/layout";
import { getDetailBook } from "@/utils/apis/books";
import { IBook } from "@/utils/types/books";
import { useEffect, useState } from "react";

const DetailBook = () => {
  const [data, setData] = useState<IBook>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await getDetailBook(1);
      setData(response.payload);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <img
              src={data?.cover_image}
              alt="Book Cover"
              width={300}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-2xl font-bold"></div>
              <div className="flex items-center space-x-2 text-sm">
                <span>by</span>
                <span className="font-medium">{data?.author}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-primary px-4 py-2 rounded-full inline-block text-primary-foreground font-medium text-sm">Fiction</div>
            <h1 className="text-4xl font-bold">{data?.title}</h1>
            <p className="text-muted-foreground leading-relaxed">{data?.description}</p>
            <div className="mt-4">
              <a href="#" className="text-primary font-medium hover:underline">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailBook;

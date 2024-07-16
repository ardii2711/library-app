import { ArrowLeftIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

import useCartStore from "@/utils/states/borrows";
import { postBorrow } from "@/utils/apis/borrows";

export default function Index() {
  const { cart, removeItem, clearCart } = useCartStore((state) => state);

  async function handleBorrow() {
    try {
      const body = {
        bookId: cart.map((item) => item.id),
        borrow_date: new Date().toISOString(),
      };

      const result = await postBorrow(body);
      toast.success(result.message);
      clearCart();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Borrow Cart</h1>
          <Link to={"/"} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-background border rounded-lg overflow-hidden group">
              <Link to={`/books/${item.id}`} className="block">
                <img
                  src={item.cover_image}
                  alt={item.title}
                  width={300}
                  height={400}
                  className="w-full mt-4 h-[400px] object-contain group-hover:opacity-80 transition-opacity"
                />
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Link to={`/books/${item.id}`} className="font-semibold text-lg hover:underline">
                    {item.title}
                  </Link>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item)}>
                    <XIcon className="w-5 h-5" />
                    <span className="sr-only">Remove from cart</span>
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="font-semibold">{cart.length}</span> books in your cart
          </p>
          <Button size="lg" onClick={() => handleBorrow()}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </Layout>
  );
}

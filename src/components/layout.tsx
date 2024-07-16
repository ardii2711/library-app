import { useLoaderData } from "react-router-dom";
import React from "react";

import Footer from "./footer";
import Header from "./header";

import useTitle from "@/utils/hooks/use-title";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const loaderData = useLoaderData() as string;
  useTitle(loaderData);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex-1 flex flex-col relative">{props.children}</div>
      <Footer />
    </div>
  );
}

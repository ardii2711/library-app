import React from "react";
import Footer from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full flex-1 flex flex-col relative">{props.children}</div>
      <Footer />
    </div>
  );
}

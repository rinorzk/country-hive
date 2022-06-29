import React from "react";
import SEO from "../seo";
import AppHeader from "../app-header";
import Footer from "../footer";
import { AppLayoutProps } from "./types";

export default function AppLayout({
  title,
  description,
  children,
}: AppLayoutProps) {
  return (
    <div>
      <SEO title={title} description={description} />
      <AppHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

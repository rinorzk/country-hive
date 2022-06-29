import React from "react";
import Footer from "../footer";
import SEO from "../seo";
import SiteHeader from "../site-header";
import { SiteLayoutProps } from "./types";

export default function SiteLayout({
  title,
  description,
  children,
}: SiteLayoutProps) {
  return (
    <div>
      <SEO title={title} description={description} />
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

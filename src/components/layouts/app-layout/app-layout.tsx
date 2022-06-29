import React from "react";
import AppHeader from "../app-header";
import SEO from "../seo";
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
      <footer>FOOTER</footer>
    </div>
  );
}

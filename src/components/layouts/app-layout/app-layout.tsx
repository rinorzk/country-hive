import React from "react";
import SEO from "../seo";
import AppHeader from "../app-header";
import Footer from "../footer";
import { AppLayoutProps } from "./types";
import AppSidebar from "../app-sidebar";
import styles from "./app-layout.module.scss";

export default function AppLayout({
  title,
  description,
  children,
  type,
  slug,
}: AppLayoutProps) {
  return (
    <div>
      <SEO title={title} description={description} />
      <AppHeader />
      <div className={styles.mainLayout}>
        <AppSidebar type={type} slug={slug} />
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

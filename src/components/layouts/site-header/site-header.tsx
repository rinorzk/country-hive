import Link from "next/link";
import React from "react";
import styles from "./site-header.module.scss";

export default function SiteHeader() {
  return (
    <header>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.title}>
          💬 Albotalk&apos;s Landing page
        </Link>
        <Link href="/login">Login</Link>
      </div>
    </header>
  );
}

import Link from 'next/link';
import React from 'react'
import styles from "./site-header.module.scss";

export default function SiteHeader() {
  return (
    <header>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.title}>💬 Albotalks&apos; Landing page</a>
        </Link>
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
      </div>
    </header>
  );
}
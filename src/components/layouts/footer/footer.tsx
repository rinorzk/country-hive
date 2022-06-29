import React from "react";
import Link from "next/link";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <div className={styles.wrapper}>
        <Link href="/app">
          <a className={styles.title}>💬 Albotalk</a>
        </Link>
        <p>© Albotalk - All rights reserved.</p>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <div className={styles.wrapper}>
        <Link href="/app" className={styles.title}>
          💬 Albotalk
        </Link>
        <p>© Albotalk - All rights reserved.</p>
      </div>
    </footer>
  );
}

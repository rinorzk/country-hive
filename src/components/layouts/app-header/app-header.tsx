import React from "react";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import styles from "./app-header.module.scss";

export default function AppHeader() {
  const { user } = useUser();

  return (
    <header>
      <div className={styles.wrapper}>
        <Link href="/app" className={styles.title}>
          💬 Albotalk
        </Link>
        <div className={styles.menuHolder}>
          <p className={styles.menuItem}>notifications</p>
          <Link href="/app/messages" className={styles.menuItem}>
            messages
          </Link>
          <p className={styles.menuItem}>{user?.user_metadata.username}</p>
        </div>
      </div>
    </header>
  );
}

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
        <p>{user?.user_metadata.username}</p>
      </div>
    </header>
  );
}

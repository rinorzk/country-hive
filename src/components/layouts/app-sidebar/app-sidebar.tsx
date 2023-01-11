import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import styles from "./app-sidebar.module.scss";
import { appSidebarLinks } from "@/assets/mock/app-sidebar";

export default function AppSidebar() {
  const router = useRouter();

  function renderLink(link: { pathname: string; label: string }) {
    return (
      <Link
        href={link.pathname}
        className={classNames(
          styles.sidebarLink,
          link.pathname === router.asPath && styles.acvtiveLink
        )}
        key={link.pathname}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.wrapper}>{appSidebarLinks.map(renderLink)}</div>
    </aside>
  );
}

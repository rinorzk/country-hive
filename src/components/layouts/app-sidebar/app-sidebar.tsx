import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { appSidebarLinks } from "@/assets/mock/app-sidebar";
import styles from "./app-sidebar.module.scss";
import { AppSidebarProps } from "./types";

export default function AppSidebar({ subMenuLinks }: AppSidebarProps) {
  const router = useRouter();

  function renderLink(pathname: string, label: string) {
    return (
      <Link
        href={pathname}
        className={classNames(
          styles.sidebarLink,
          pathname === router.asPath && styles.acvtiveLink
        )}
        key={pathname}
      >
        {label}
      </Link>
    );
  }

  function renderMenuLink(link: { pathname: string; label: string }) {
    const label = subMenuLinks?.length ? link.label.slice(0, 1) : link.label;
    return renderLink(link.pathname, label);
  }

  function renderSubMenuLink(link: { pathname: string; label: string }) {
    return renderLink(link.pathname, link.label);
  }

  return (
    <aside className={styles.aside}>
      <div className={classNames(!subMenuLinks?.length && styles.wrapper)}>
        {appSidebarLinks.map(renderMenuLink)}
      </div>
      {subMenuLinks && (
        <div className={styles.wrapper}>
          {subMenuLinks.map(renderSubMenuLink)}
        </div>
      )}
    </aside>
  );
}

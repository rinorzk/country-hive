import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { appLinks, communityLinks } from "@/assets/mock/sidebar-links";
import styles from "./app-sidebar.module.scss";
import { AppSidebarProps } from "./types";

export default function AppSidebar({ type, slug }: AppSidebarProps) {
  const router = useRouter();

  function formatLinkWithSlug(link: { pathname: string; label: string }) {
    return {
      ...link,
      pathname: slug + link.pathname,
    };
  }

  const links = {
    app: appLinks,
    community: communityLinks.map(formatLinkWithSlug),
  };

  function renderMenuLink(link: { pathname: string; label: string }) {
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
      <div className={styles.wrapper}>{links[type]?.map(renderMenuLink)}</div>
    </aside>
  );
}

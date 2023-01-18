import React from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { Community } from "@/base/types/db";
import { CommunitiesListProps } from "./types";
import CommunityCard from "./community-card";
import styles from "./communities-list.module.scss";

export default function CommunitiesList({
  communities,
  country,
}: CommunitiesListProps) {
  function renderCommunityLink(cmt: Community) {
    return (
      <li key={cmt.id}>
        <Link key={cmt.id} href={`/app/${kebabCase(country)}/${cmt.slug}`}>
          <CommunityCard {...cmt} />
        </Link>
      </li>
    );
  }

  return (
    <section>
      <ul className={styles.communityList}>
        {communities.map(renderCommunityLink)}
      </ul>
    </section>
  );
}

import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { Community } from "@/base/types/db";
import { CommunitiesListProps } from "./types";
import CommunityCard from "./community-card";
import styles from "./community-list.module.scss";

export default function CommunitiesList({
  communities,
  country,
  createCommunityHandler,
}: CommunitiesListProps) {
  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  function renderCommunityLink(cmt: Community) {
    return (
      <li key={cmt.id}>
        <Link key={cmt.id} href={`/app/${kebabCase(country)}/${cmt.slug}`}>
          <CommunityCard {...cmt} />
        </Link>
      </li>
    );
  }

  function filterCommunities(communitites: Community[], query: string) {
    return communitites.filter(
      (ctm) => ctm.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    const newCommunityList = filterCommunities(communities, query);
    setFilteredCommunities(newCommunityList);
  }

  return (
    <section>
      <div>
        <input
          placeholder="Search communities"
          onChange={handleSearch}
          className={styles.search}
        />
        <button onClick={createCommunityHandler}>Create community</button>
      </div>
      <ul className={styles.communityList}>
        {filteredCommunities.map(renderCommunityLink)}
      </ul>
    </section>
  );
}

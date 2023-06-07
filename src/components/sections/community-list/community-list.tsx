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
    return communitites.filter((ctm) => {
      const keyword = query.toLowerCase();
      const name = ctm.name.toLowerCase();
      const description = ctm.description.toLowerCase();
      return (
        name.indexOf(keyword) !== -1 || description.indexOf(keyword) !== -1
      );
    });
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    const newCommunityList = filterCommunities(communities, query);
    setFilteredCommunities(newCommunityList);
  }

  function renderNoResults() {
    if (!filteredCommunities.length) {
      return <p>No communities found!</p>;
    }
  }

  return (
    <section>
      <div>
        <input
          placeholder="Search communities"
          onChange={handleSearch}
          className={styles.search}
        />
        {createCommunityHandler ? (
          <button onClick={createCommunityHandler}>Create community</button>
        ) : null}
      </div>
      <ul className={styles.communityList}>
        {filteredCommunities.map(renderCommunityLink)}
      </ul>
      {renderNoResults()}
    </section>
  );
}

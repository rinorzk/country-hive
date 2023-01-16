import React from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { Country } from "@/base/types/app";
import { CountriesListProps } from "./types";
import styles from "./country-list.module.scss";

export default function CountriesList({ countries }: CountriesListProps) {
  function renderCountryLink(country: Country) {
    return (
      <Link
        href={`/app/${kebabCase(country.name)}/`}
        passHref
        className={styles.countryCard}
        key={country.name}
      >
        {country.flag} {country.name}
      </Link>
    );
  }

  return (
    <ul className={styles.countryList}>{countries.map(renderCountryLink)}</ul>
  );
}

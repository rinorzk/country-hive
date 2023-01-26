import React, { useState } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import { Country } from "@/base/types/app";
import { CountriesListProps } from "./types";
import styles from "./country-list.module.scss";

export default function CountriesList({ countries }: CountriesListProps) {
  const [filteredCountries, setFilteredCountries] = useState(countries);

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

  function filterCountries(countries: Country[], query: string) {
    return countries.filter((country) => {
      const keyword = query.toLowerCase();
      const name = country.name.toLowerCase();
      return name.indexOf(keyword) !== -1;
    });
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    const newCountryList = filterCountries(countries, query);
    setFilteredCountries(newCountryList);
  }

  function renderNoResults() {
    if (!filteredCountries.length) {
      return <p>No countries found!</p>;
    }
  }

  return (
    <section>
      <input
        placeholder="Search your country"
        onChange={handleSearch}
        className={styles.search}
      />
      <ul className={styles.countryList}>
        {filteredCountries.map(renderCountryLink)}
      </ul>
      {renderNoResults()}
    </section>
  );
}

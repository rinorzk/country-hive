import React from "react";
import Link from "next/link";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import countries from "@/assets/mock/countries";
import { Country } from "@/base/types/app";

export default function Discover({ user }: { user: User }) {
  function renderCountryLink(country: Country) {
    return (
      <li key={country.name}>
        <Link href={`/app/${country.name.toLowerCase()}/`} passHref>
          {country.flag} {country.name}
        </Link>
      </li>
    );
  }

  return (
    <AppLayout
      title="albotalk - browse through communities of your country"
      type="app"
    >
      <h1>Discover</h1>
      <p>Browse all countries and check their communities</p>

      <ul>{countries.europe.map(renderCountryLink)}</ul>
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    return { props: { user: user } };
  },
});

import React from "react";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";
import countries from "@/assets/mock/countries";
import CountriesList from "@/components/sections/country-list";

export default function Discover({ user }: { user: User }) {
  return (
    <AppLayout
      title="albotalk - browse through communities of your country"
      type="app"
    >
      <h1>Discover</h1>
      <p>Browse all countries and check their communities</p>

      <CountriesList countries={countries} />
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

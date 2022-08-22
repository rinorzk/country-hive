import React from "react";
import AppLayout from "@/components/layouts/app-layout";
import { getUser, withPageAuth } from "@supabase/auth-helpers-nextjs";

export default function Country({ country }: { country: string }) {
  return (
    <AppLayout title={`${country.toUpperCase()} - Communities`}>
      <h2>{country}</h2>
    </AppLayout>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    return { props: { user: user, country: ctx.params.param[0] } };
  },
});

import React from "react";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";

export default function App({ user }: { user: User }) {
  async function handleSignOut() {
    // TODO: make this redirect after signOut
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.log("error", error);
  }

  return (
    <AppLayout
      title="albotalk - check out the latest from you communities"
      type="app"
    >
      <h2>ALBOTALK App</h2>

      <h3>FEED</h3>

      <button onClick={handleSignOut}>Sign out</button>
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

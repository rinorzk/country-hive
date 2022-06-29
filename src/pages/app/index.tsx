import React from "react";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import AppLayout from "@/components/layouts/app-layout";

export default function App({ user }: { user: User }) {
  return (
    <AppLayout title="albotalk - browse through communities of your country">
      <h3>ALBOTALK App</h3>
      <p>{user.email}</p>

      <button
        onClick={async () => {
          // TODO: make this redirect after signOut
          const { error } = await supabaseClient.auth.signOut();
          if (error) console.log("error", error);
        }}
      >
        Sign out
      </button>
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

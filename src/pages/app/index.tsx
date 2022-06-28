import { FC } from "react";
import Head from "next/head";
import { getUser, User, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

const App: FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <Head>
        <title>albotalk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main><h3>ALBOTALK App</h3>
      <p>{user.email}</p>
      </main>

      <footer>
        <button
          onClick={async () => {
            // TODO: make this redirect after signOut
            const { error } = await supabaseClient.auth.signOut();
            if (error) console.log("error", error);
          }}
        >
          Sign out
        </button>
      </footer>
    </div>
  );
};

export default App;

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    return { props: { user: user } };
  }
});

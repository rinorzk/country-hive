import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import SiteLayout from "@/components/layouts/site-layout";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (user) router.push({ pathname: "/app" });
    });
  }, [router]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signIn({ email, password });
      if (error) throw error;
      // alert("Check your email for the login link!");
      router.push({ pathname: "/app" });
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout title="albotalk - login">
      <div>
        <h2>Log in for albotalk</h2>
        <div>
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Submit</button>
        </div>
      </div>
    </SiteLayout>
  );
}

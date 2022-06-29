import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import SiteLayout from "@/components/layouts/site-layout";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push({ pathname: "/app" });
    }
  }, [user]);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signUp(
        { email, password },
        { data: { username }, redirectTo: "http://localhost:3000/login" }
      );
      if (error) throw error;
      alert(
        "Thank you for signing up! Please check your email for confirmation link."
      );
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout title="albotalk - signup">
      <h2>Sign up for albotalk</h2>
      <div>
        <input
          type="username"
          required
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button onClick={handleSignup}>Submit</button>
      </div>
    </SiteLayout>
  );
}

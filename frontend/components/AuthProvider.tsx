import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "@/lib/context";
import { supabase } from "@/lib/supabase";
import { AuthUser } from "@supabase/supabase-js";
import axios from "axios";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // set user from supabase
  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ? session?.user : null);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ? session?.user : null);
        setLoading(false);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // set cookie for backend from supabase
  useEffect(() => {
    axios.post("/api/supabase/cookie", {
      event: user ? "SIGNED_IN" : "SIGNED_OUT",
      session: supabase.auth.session(),
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

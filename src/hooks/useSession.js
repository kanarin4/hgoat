// hooks/useSession.js
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { USE_SUPABASE } from "../services/config";

export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!USE_SUPABASE) {
      setSession({
        user: {
          email: "admin@hgoat.local",
          user_metadata: { full_name: "Admin User" },
        },
      });
      return;
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return session;
}
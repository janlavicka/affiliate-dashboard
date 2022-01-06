import { AuthUser } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextState = {
  user: AuthUser | null;
  loading: Boolean;
};

export const AuthContext = createContext<AuthContextState>({
  user: null,
  loading: true,
});

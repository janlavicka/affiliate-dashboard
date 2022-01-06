import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "@/lib/context";

type Props = {
  children: ReactNode;
};

export default function Auth({ children }: Props) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading]);

  return user && !loading ? <>{children}</> : <></>;
}

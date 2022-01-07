import { AuthContext } from "@/lib/context";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}

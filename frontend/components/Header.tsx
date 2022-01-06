import Link from "next/link";
import { supabase } from "@/lib/supabase";

const items = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Connections", href: "/connections" },
];

export default function Header() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav>
      <ul>
        {items.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={handleSignOut}>Sign out</button>
    </nav>
  );
}

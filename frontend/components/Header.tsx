import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";

const items = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Campaigns", href: "/campaigns" },
  { name: "Connections", href: "/connections" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="min-h-full">
      <div className="max-w-screen-xl mx-auto bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-5">
          <Link href="/">
            <a className="text-xl font-bold text-gray-900">Dashboard</a>
          </Link>

          <ul className="items-center hidden space-x-8 md:flex">
            {items.map(({ name, href }) => (
              <li key={name}>
                <Link href={href}>
                  <a className="font-medium text-gray-900 hover:text-blue-700">
                    {name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSignOut}
            className="hidden px-4 py-2 font-medium text-gray-900 bg-gray-200 rounded-md md:inline hover:bg-gray-300"
          >
            Sign out
          </button>

          <button
            className="p-2 -mr-1 rounded md:hidden"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-5 text-gray-900" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
        </div>

        {open && (
          <div className="pb-4 md:hidden">
            <ul className="space-y-4">
              {items.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href}>
                    <a className="block px-4 py-2 font-medium text-gray-900 hover:text-blue-700">
                      {name}
                    </a>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 mx-4 font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

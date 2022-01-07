import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { Connection } from "@/types";
import { useQuery } from "react-query";
import Item from "@/components/connections/Item";
import { getConnections } from "@/lib/queries";

function Page() {
  const { data: connections, isFetching } = useQuery<Connection[]>(
    "connections",
    getConnections,
  );

  return (
    <>
      <Head>
        <title>Connections | Affiliate dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-4 pt-10 pb-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-6 md:flex md:items-center md:justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Connections</h1>
          </div>

          <div className="mt-4 md: md:mt-0">
            <Link href="/connections/create/ehub-cz">
              <a className="px-4 py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600">
                Connect ehub.cz
              </a>
            </Link>
          </div>
        </div>

        {!isFetching ? (
          <ul
            role="list"
            className="border-gray-200 divide-y divide-gray-200 border-y"
          >
            {connections?.map((connection) => (
              <Item connection={connection} key={connection.id} />
            ))}
          </ul>
        ) : (
          <Spinner />
        )}
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

Page.isProtected = true;

export default Page;

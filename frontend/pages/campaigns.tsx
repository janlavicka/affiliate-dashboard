import Item from "@/components/campaigns/Item";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { getCampaigns } from "@/lib/queries";
import { Campaign } from "@/types";
import Head from "next/head";
import { ReactElement } from "react";
import { useQuery } from "react-query";

function Page() {
  const { data: campaigns, isFetching } = useQuery<Campaign[]>(
    "campaigns",
    getCampaigns,
  );

  return (
    <>
      <Head>
        <title>Campaigns | Affiliate dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-4 pt-10 pb-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Campaigns</h1>
        </div>

        {!isFetching ? (
          <ul
            role="list"
            className="border-gray-200 divide-y divide-gray-200 border-y"
          >
            {campaigns?.map((campaign) => (
              <Item campaign={campaign} key={campaign.id} />
            ))}
          </ul>
        ) : (
          <Spinner />
        )}
      </main>
    </>
  );
}

Page.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

Page.isProtected = true;

export default Page;

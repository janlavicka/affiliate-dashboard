import Layout from "@/components/Layout";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Campaigns | Affiliate dashboard</title>
      </Head>

      <main className="container px-4 pt-10 pb-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Campaigns</h1>
        </div>
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

Page.isProtected = true;

export default Page;

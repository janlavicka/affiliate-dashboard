import Layout from "@/components/Layout";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Campaigns | Affiliate dashboard</title>
      </Head>

      <main>
        <h1>Campaigns</h1>
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

Page.isProtected = true;

export default Page;

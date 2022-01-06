import Layout from "@/components/Layout";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Dashboard | Affiliate dashboard</title>
      </Head>

      <main>
        <h1>Dashboard</h1>
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

Page.isProtected = true;

export default Page;

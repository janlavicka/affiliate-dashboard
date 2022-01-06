import Layout from "@/components/Layout";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Connections | Affiliate dashboard</title>
      </Head>

      <main>
        <h1>Connections</h1>
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Page;

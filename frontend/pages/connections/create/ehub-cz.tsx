import Layout from "@/components/Layout";
import Head from "next/head";

function Page() {
  return (
    <>
      <Head>
        <title>Connect ehub.cz | Affiliate dashboard</title>
      </Head>

      <main>
        <h1>Connect ehub.cz</h1>
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Page;

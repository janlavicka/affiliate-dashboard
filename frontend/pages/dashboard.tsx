import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import {
  useApprovedSeries,
  useDateRange,
  useExpectedSeries,
  useNewSeries,
} from "@/lib/hooks";
import { getCommissions } from "@/lib/queries";
import { Commission } from "@/types";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Head from "next/head";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Page() {
  const { data: commissions, isFetching } = useQuery<Commission[]>(
    "commissions",
    getCommissions,
  );

  const dateRange = useDateRange();
  const newSeries = useNewSeries(dateRange, commissions ? commissions : []);
  const approvedSeries = useApprovedSeries(
    dateRange,
    commissions ? commissions : [],
  );
  const expectedSeries = useExpectedSeries(
    dateRange,
    commissions ? commissions : [],
  );

  return (
    <>
      <Head>
        <title>Dashboard | Affiliate dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container px-4 pt-10 pb-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {!isFetching ? (
          <Bar
            options={{
              responsive: true,
              interaction: {
                mode: "index" as const,
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                  ticks: {
                    callback(this: any, value: any) {
                      return `${value.toFixed(0)} Kč`;
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  position: "bottom",
                },
                tooltip: {
                  callbacks: {
                    label(this: any, tooltipItem: any) {
                      return `${tooltipItem.raw.toFixed(2)} Kč`;
                    },
                  },
                },
              },
            }}
            data={{
              labels: dateRange.map((date) => date.format("MMM YYYY")),
              datasets: [
                {
                  label: "New",
                  data: newSeries,
                  backgroundColor: "rgb(156, 163, 175)",
                  stack: "Stack 0",
                },
                {
                  label: "Approved",
                  data: approvedSeries,
                  backgroundColor: "rgb(34, 197, 94)",
                  stack: "Stack 1",
                },
                {
                  label: "Expected approval",
                  data: expectedSeries,
                  backgroundColor: "rgb(96, 165, 250)",
                  stack: "Stack 1",
                },
              ],
            }}
          />
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

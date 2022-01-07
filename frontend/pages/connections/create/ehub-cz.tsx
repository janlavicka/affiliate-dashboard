import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Yup from "yup";

function Page() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Connect ehub.cz | Affiliate dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container max-w-2xl px-4 pt-10 pb-12 mx-auto sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Connect ehub.cz</h1>
        </div>

        <Formik
          initialValues={{
            name: "",
            publisher_id: "",
            api_key: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Please enter name of connection."),
            publisher_id: Yup.string().required(
              "Please enter your publisher ID.",
            ),
            api_key: Yup.string().required("Please enter your API key."),
          })}
          onSubmit={async (values, { setStatus }) => {
            const result = await axios.post("/api/ehub-cz/varify", values);

            if (!result.data.varified) {
              setStatus("Your publisher ID or API key is invalid.");
              return;
            }

            let { error } = await supabase.from("connections").insert({
              type: "ehub-cz",
              name: values.name,
              credentials: {
                publisher_id: values.publisher_id,
                api_key: values.api_key,
              },
            });

            if (error) {
              setStatus("An error occurred. Please try again.");
              return;
            }

            router.push("/connections");
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-6">
              {status && (
                <div
                  role="alert"
                  className="px-3 py-2 text-sm font-medium text-red-800 bg-red-100 rounded-md"
                >
                  {status}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <div className="mt-1">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="publisher_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Publiser ID
                </label>

                <div className="mt-1">
                  <Field
                    id="publisher_id"
                    name="publisher_id"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                  />
                </div>

                <ErrorMessage
                  name="publisher_id"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="api_key"
                  className="block text-sm font-medium text-gray-700"
                >
                  API key
                </label>

                <div className="mt-1">
                  <Field
                    id="api_key"
                    name="api_key"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                  />
                </div>

                <ErrorMessage
                  name="api_key"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              <button
                className="w-full px-4 py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Connecting..." : "Connect"}
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}

Page.getLayout = (page: any) => <Layout>{page}</Layout>;

Page.isProtected = true;

export default Page;

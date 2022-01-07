import { AuthContext } from "@/lib/context";
import { supabase } from "@/lib/supabase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Head>
        <title>Sign in | Affiliate dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-sm m-6">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold text-center">
              Affiliate dashboard
            </h1>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string().required(),
                password: Yup.string().required(),
              })}
              onSubmit={async ({ email, password }, { setStatus }) => {
                const { error } = await supabase.auth.signIn({
                  email,
                  password,
                });

                if (error) {
                  setStatus(error.message);

                  return;
                }

                router.push("/dashboard");
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
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-700 focus:border-blue-700"
                      />
                    </div>

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  <button
                    className="w-full px-4 py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </div>
  );
}

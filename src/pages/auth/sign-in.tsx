import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

import { signInSchema } from 'schemas/sign-in.schema';
import Link from "next/link";

const SignInPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Formik initialValues={{
        email: "",
        password: "",
      }}
        onSubmit={async (values) => {
          const result = await signIn("credentials", {
            ...values,
            redirect: false
          })
          console.log(result);
          if (!result.error && result.ok) router.push("/");
          else router.push("/error");
        }}
        validationSchema={signInSchema}
      >
        <Form>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <Field name="email" id="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Enter your password:</label>
            <Field name="password" id="password" type="password" />
            <ErrorMessage name="password" />
          </div>
          <button type="submit">Sign In</button>
        </Form>
      </Formik>

      <p>Not registered? <Link href="/auth/register">Sign up here.</Link></p>
    </div>
  );
}

export default SignInPage;

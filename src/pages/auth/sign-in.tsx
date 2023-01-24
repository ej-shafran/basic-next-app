import { NextPage } from "next";
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

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
          else router.push("/auth/error");
        }}
      >
        <Form>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <Field name="email" id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Enter your password:</label>
            <Field name="password" id="password" type="password" />
          </div>
          <button type="submit">Sign In</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignInPage;

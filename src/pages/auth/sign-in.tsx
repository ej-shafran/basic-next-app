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
          if(!result.error && result.ok) router.push("/");
          else router.push("/auth/error");
        }}
      >
        <Form>
          <Field name="email" type="email" label="Enter your email:" />
          <Field name="password" type="password" label="Enter your password:" />
          <button type="submit">Sign In</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignInPage;

import { NextPage } from "next";
import { Formik, Form, Field } from 'formik';
import { omit } from 'lodash';
import axios from "axios";

import { RegisterDTO } from "types/register.dto";
// import { useRouter } from "next/router";

const RegisterPage: NextPage = () => {
  // const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "", email: "", confirmPassword: "" }}
        onSubmit={async (values) => {
          const body: RegisterDTO = {
            ...omit(values, "confirmPassword")
          }
          const { data: id } = await axios.post<number>("/api/auth/register", body);
          console.log(id);
        }}>
        <Form>
          <div>
            <label htmlFor="name">Enter your name:</label>
            <Field name="name" id="name" />
          </div>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <Field name="email" id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Enter your password:</label>
            <Field name="password" type="password" id="password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm your password:</label>
            <Field name="confirmPassword" type="password" id="confirmPassword" />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;

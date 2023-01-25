import { NextPage } from "next";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { omit } from 'lodash';
import axios from "axios";

import { registerSchema } from "schemas/register.schema";
import { signIn } from "next-auth/react";
import { RegisterDTO } from "types/register.dto";

const RegisterPage: NextPage = () => {
  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "", email: "", confirmPassword: "" }}
        onSubmit={async (values) => {
          const body: RegisterDTO = omit(values, "confirmPassword") 
          const { data: id } = await axios.post<number>("/api/auth/register", body);
          console.log(id);
          signIn("credentials", omit(body, "name"));
        }}
        validationSchema={registerSchema}
      >
        <Form>
          <div>
            <label htmlFor="name">Enter your name:</label>
            <Field name="name" id="name" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <label htmlFor="email">Enter your email:</label>
            <Field name="email" id="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Enter your password:</label>
            <Field name="password" type="password" id="password" />
            <ErrorMessage name="password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm your password:</label>
            <Field name="confirmPassword" type="password" id="confirmPassword" />
            <ErrorMessage name="confirmPassword" />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;

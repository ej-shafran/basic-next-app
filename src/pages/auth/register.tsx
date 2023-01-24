import { NextPage } from "next";
import { Formik, Form, Field } from 'formik';
import { omit } from 'lodash';
import axios from "axios";

import { RegisterDTO } from "types/register.dto";

const RegisterPage: NextPage = () => {
  return (
    <div>
      <Formik initialValues={{ name: "", password: "", email: "", confirmPassword: "" }}

        onSubmit={async (values) => {
          const body: RegisterDTO = {
            ...omit(values, "confirmPassword")
          }
          const { data: id } = await axios.post<number>("/api/auth/register", body);
          console.log(id);
        }}>
        <Form>
          <Field name="name" />
          <Field name="password" />
          <Field name="confirmPassword" />
          <Field name="email" />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegisterPage;

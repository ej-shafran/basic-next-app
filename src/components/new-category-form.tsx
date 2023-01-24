import { Field, Form, Formik } from "formik";
import { CategoryDTO } from "types/category.dto";

import { categorySchema } from "schemas/category.schema";

interface NewCategoryFormProps {
  onSubmit: (values: CategoryDTO) => void;
}

export const NewCategoryForm: React.FC<NewCategoryFormProps> = (props) => {
  const { onSubmit } = props;
  return (<div>
    <Formik initialValues={{ name: "" }} onSubmit={(values, bag) => {
      onSubmit(values);
      bag.resetForm();
    }}
      validationSchema={categorySchema}
    >
      <Form>
        <h2>Add a new category:</h2>
        <label htmlFor="name">Enter the category's name:</label>
        <Field name="name" id="name" />
        <button type="submit">Add</button>
      </Form>
    </Formik>
  </div>);
}

import { Formik, Form, Field, ErrorMessage } from "formik";
import { productSchema } from "schemas/product.schema";
import { ProductDTO } from "types/product.dto";

interface NewProductFormProps {
  onSubmit: (values: ProductDTO) => void;
  categoryId: number;
}

const NewProductForm: React.FC<NewProductFormProps> = (props) => {
  const { onSubmit, categoryId } = props;
  return (
    <Formik
      initialValues={{
        name: "",
        cost: 0,
        brand: ""
      }}
      onSubmit={(values, bag) => {
        onSubmit({ ...values, categoryId });
        bag.resetForm();
      }}
      validationSchema={productSchema}
    >
      <Form>
        <h2>Add a new product:</h2>
        <div>
          <div>
            <label htmlFor="name">Enter the product's name:</label>
            <Field name="name" id="name" />
            <ErrorMessage name="name" />
          </div>
          <div>
            <label htmlFor="cost">Enter the cost of the product:</label>
            <Field name="cost" id="cost" type="number" />
            <ErrorMessage name="cost" />
          </div>
          <div>
            <label htmlFor="brand">Enter the product's brand:</label>
            <Field name="brand" id="brand" />
            <ErrorMessage name="brand" />
          </div>
        </div>

        <button type="submit">Add</button>
      </Form>
    </Formik>
  );
};

export default NewProductForm;

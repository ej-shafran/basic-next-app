import { Color } from "@prisma/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ItemDTO } from "types/item.dto";
import FormikSelect from "./formik-select";

interface NewProductFormProps {
  onSubmit: (values: ItemDTO[]) => void;
  productId: number;
}

const NewItemForm: React.FC<NewProductFormProps> = (props) => {
  const { onSubmit, productId } = props;
  return (
    <Formik initialValues={[{
      amount: 0,
      color: "RED",
    }]} onSubmit={(values: Omit<ItemDTO, "productId">[], bag) => {
      onSubmit(values.map(item => ({ ...item, productId })));
      bag.resetForm();
    }}>
      {({ values, setValues }) => (
        <Form>
          <h2>Add new items:</h2>
          <ul>
            {values.map((_, i) => (<li key={i}>
              <div>
                <label htmlFor={`[${i}].amount`}>Enter the product's name:</label>
                <Field name={`[${i}].amount`} id={`[${i}].amount`} />
                <ErrorMessage name={`[${i}].amount`} />
              </div>
              <div>
                <label htmlFor={`[${i}].color`}>Enter the product's name:</label>
                <FormikSelect name={`[${i}].color`} id={`[${i}].color`}>
                  {Object.values(Color).map(color => (<option key={color} value={color}>
                    {color}
                  </option>))}
                </FormikSelect>
                <ErrorMessage name={`[${i}].color`} />
              </div>
            </li>))}
          </ul>

          <button type="button" onClick={() => setValues([...values, { amount: 0, color: "RED" }])}>More items</button>

          <button type="submit">Add</button>
        </Form>
      )}
    </Formik>
  );
};

export default NewItemForm;

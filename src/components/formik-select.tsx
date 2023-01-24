import { useField } from "formik";

const FormikSelect: React.FC<{ name: string; id: string; children?: React.ReactNode }> = (props) => {
  const { name, id, children } = props;
  const [field] = useField(name);
  return (<select {...field} id={id}>
    {children}
  </select>)
}

export default FormikSelect;

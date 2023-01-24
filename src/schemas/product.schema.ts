import * as yup from 'yup';

export const productSchema = yup.object({
  cost: yup.number().required().label("This field"),
  name: yup.string().required().min(3).label("This field"),
  brand: yup.string().required().min(3).label("This field"),
});

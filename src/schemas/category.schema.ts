import * as yup from 'yup';

export const categorySchema = yup.object({
  name: yup.string().required().min(3).label("This field"),
})

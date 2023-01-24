import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup.string().required().email().label("This field"),
  password: yup.string().required().min(8).matches(/^[a-zA-Z0-9]*$/, "Should only consist of letters and numbers.").label("This field"),
  confirmPassword: yup.string().required().min(8).matches(/^[a-zA-Z0-9]*$/, "Should only consist of letters and numbers.").oneOf([yup.ref("password")], "The passwords should match.").label("This field"),
  name: yup.string().required().matches(/^[a-zA-Z0-9]*$/, "Should only consist of letters and numbers.").label("This field"),
})

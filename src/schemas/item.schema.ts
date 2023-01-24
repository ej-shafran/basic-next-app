import * as yup from 'yup';
import { Color } from '@prisma/client';

export const itemSchema = yup.array().of(yup.object({
  color: yup.string().required().oneOf(Object.values(Color)).label("This field"),
  amount: yup.number().integer().required().label("This field"),
}))

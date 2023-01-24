import { Color } from "@prisma/client";
import { IsIn, IsInt, IsString } from "class-validator";

export class ItemDTO {
  @IsString()
  @IsIn(Object.values(Color))
  color: Color;

  @IsInt()
  amount: number;

  @IsInt()
  productId: number;
}

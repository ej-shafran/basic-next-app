import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsInt()
  categoryId: number;
}

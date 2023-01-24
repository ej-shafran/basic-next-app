import { Body, createHandler, Delete, ParseNumberPipe, Post, Query, ValidationPipe, } from "next-api-decorators"
import { ProductDTO } from "types/product.dto";

import db from 'db';

class ProductHandler {
  @Post()
  async addProduct(@Body(ValidationPipe) body: ProductDTO) {
    await db.product.create({ data: body });
    return true;
  }

  @Delete()
  async deleteProduct(@Query("id", ParseNumberPipe) id: number) {
    await db.product.delete({ where: { id } });
    return true;
  }
}

export default createHandler(ProductHandler);

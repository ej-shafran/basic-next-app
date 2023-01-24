import { Body, createHandler, Post, ValidationPipe,  } from "next-api-decorators"
import { ProductDTO } from "types/product.dto";

import db from 'db';

class ProductHandler {
  @Post()
  async addProduct(@Body(ValidationPipe) body: ProductDTO) {
    await db.product.create({ data: body }); 
    return true;
  }
}

export default createHandler(ProductHandler);

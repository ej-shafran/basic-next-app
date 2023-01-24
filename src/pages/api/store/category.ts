import { Body, createHandler, Post, ValidationPipe,  } from "next-api-decorators"
import { CategoryDTO } from "types/category.dto";

import db from 'db';

class CategoryHandler {
  @Post()
  async addCategory(@Body(ValidationPipe) body: CategoryDTO) {
    console.log(body);
    await db.category.create({ data: body }); 
    return true;
  }
}

export default createHandler(CategoryHandler);

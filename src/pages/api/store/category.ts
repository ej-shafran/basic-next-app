import { Body, createHandler, Delete, ParseNumberPipe, Post, Query, ValidationPipe, } from "next-api-decorators"
import { CategoryDTO } from "types/category.dto";

import db from 'db';

class CategoryHandler {
  @Post()
  async addCategory(@Body(ValidationPipe) body: CategoryDTO) {
    await db.category.create({ data: body });
    return true;
  }

  @Delete()
  async deleteCategory(@Query("id", ParseNumberPipe) id: number) {
    await db.category.delete({ where: { id } });
    return true;
  }
}

export default createHandler(CategoryHandler);

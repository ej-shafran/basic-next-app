import { Body, createHandler, Delete, ParseNumberPipe, Post, Query, ValidationPipe, } from "next-api-decorators"
import { ItemDTO } from "types/item.dto";

import db from 'db';

class ItemHandler {
  @Post()
  async addItem(@Body(ValidationPipe) body: ItemDTO[]) {
    await db.item.createMany({ data: body });
    return true;
  }

  @Delete()
  async deleteItem(@Query("id", ParseNumberPipe) id: number) {
    await db.item.delete({ where: { id } });
    return true;
  }
}

export default createHandler(ItemHandler);

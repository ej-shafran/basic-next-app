import { Body, createHandler, Post, ValidationPipe,  } from "next-api-decorators"
import { ItemDTO } from "types/item.dto";

import db from 'db';

class ItemHandler {
  @Post()
  async addItem(@Body(ValidationPipe) body: ItemDTO) {
    await db.item.create({ data: body }); 
    return true;
  }
}

export default createHandler(ItemHandler);

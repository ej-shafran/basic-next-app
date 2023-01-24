import { Body, createHandler, Post, ValidationPipe } from "next-api-decorators";

import { RegisterDTO } from "types/register.dto";
import db from 'db';
import { Role } from "@prisma/client";

class RegisterHandler {
  @Post()
  async register(@Body(ValidationPipe) body: RegisterDTO) {
    const role = process.env.ROLE === "ADMIN" ? Role.ADMIN : Role.CUSTOMER;
    const user = await db.user.create({ data: { ...body, role } });
    return user.id;
  }
}

export default createHandler(RegisterHandler);

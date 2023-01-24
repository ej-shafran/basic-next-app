import { Body, createHandler, Post, ValidationPipe } from "next-api-decorators";
import { Role } from "@prisma/client";
import { hash } from 'bcrypt';

import { RegisterDTO } from "types/register.dto";
import db from 'db';

class RegisterHandler {
  @Post()
  async register(@Body(ValidationPipe) body: RegisterDTO) {
    const role = process.env.ROLE === "ADMIN" ? Role.ADMIN : Role.CUSTOMER;
    const password = await hash(body.password, 10);
    const data = {
      email: body.email,
      name: body.name,
      password,
      role,
    }
    const user = await db.user.create({ data });
    return user.id;
  }
}

export default createHandler(RegisterHandler);

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import db from 'db';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      authorize: async (credentials: { email: string; password: string; }) => {
        const user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error("Invalid credentials.");

        const correct = await compare(credentials.password, user.password);
        if (!correct) throw new Error("Invalid credentials.");

        return user;
      },
    })
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    jwt(params) {
      if(params.user && params.user.role) {
        params.token.role = params.user.role;
      }
      return params.token;
    },
    session(params) {
      if(params.token.role) {
        params.session.user.role = params.token.role;
      }
      return params.session;
    },
  }
})

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      authorize(credentials: { email: string; password: string; }, req) {
        if(credentials.email === "evyatar@gmail.com" && credentials.password === "asdfasdf") return {
          id: "hi",
          email: "hi",
          password: "hi"
        }
        return null;        
      },
    })
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    jwt(params) {
      console.log(params);
      return params.token;
    },
    session(params) {
      console.log(params);
      return params.session; 
    },
  }
})

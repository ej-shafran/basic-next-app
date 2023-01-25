namespace NodeJS {
  interface ProcessEnv {
    ROLE: "ADMIN" | "CUSTOMER";

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}

import { Role } from "@prisma/client";
import { NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from "next/link";


const HomePage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>You are signed in! Welcome back, {session.user.name ?? "good friend!"}</p>
        <button onClick={() => signOut()}>Sign Out</button>
        <Link href="/store/storefront">To the store</Link>
        {session.user.role === Role.ADMIN && (
          <Link href="/admin">To the admin section</Link>
        )}
      </>
    )
  }

  return <>
    <p>You are not signed in.</p>
    <button onClick={() => signIn()}>Sign In With Credentials</button>
    <button onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}>Sign In With Google</button>
    <button onClick={() => signIn("github", { callbackUrl: "http://localhost:3000" })}>Sign In With GitHub</button>
    <p>Or <Link href="/auth/register">Register Here</Link></p>
  </>
}

export default HomePage;

import { NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react'


const HomePage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>You are signed in! Welcome back, {session.user.name ?? "good friend!"}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  return <>
    <p>You are not signed in.</p>
    <button onClick={() => signIn()}>Sign In</button>
    <button onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}>Sign In With Google</button>
  </>
}

export default HomePage;

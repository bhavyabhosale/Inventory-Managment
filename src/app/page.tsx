import AuthDesign from "@/components/AuthDesign";
import { auth } from "../../auth";
import { db } from "@/lib/db";
import ClientComp from "@/components/ClientComp";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import AppBar from "@/components/AppBar";

export default async function Home() {
  const session = await auth();
  console.log(session, "session");

  if (session) {
    const user = await db.user.findUnique({
      where: { email: session?.user?.email! },
      include: { Inventory: true },
    });
    console.log(user, "user");

    if (user && !user?.isAdmin) {
      return (
        <>
          <AppBar />
          <ClientComp user={user} />
        </>
      );
    } else {
      redirect('/dashboard');
    }
  } else {
    redirect('/login');
  }
}
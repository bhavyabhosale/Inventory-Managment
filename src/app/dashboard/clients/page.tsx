import { db } from "@/lib/db";
import React from "react";
import { auth } from "../../../../auth";
import ClientsData from "@/components/ClientsData";

const ClientsPage = async () => {
  const session = await auth();
  const users = await db.user.findMany({
    where: { NOT: { email: session?.user?.email! } },
  });
  return <ClientsData data={users} />;
};

export default ClientsPage;

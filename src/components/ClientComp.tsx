import { db } from "@/lib/db";
import React from "react";
import ClientInventory from "./ClientInventory";

const ClientComp = async ({ user }: any) => {
  const clients = await db.user.findMany({
    where: {
      NOT: {
        id: user?.id,
      },
      isAdmin: false,
    },
  });

  const response = {
    ...user,
    Inventory: user?.Inventory?.map((inven: any) => {
      return { ...inven, clients };
    }),
  };
  return <ClientInventory user={response} />;
};

export default ClientComp;

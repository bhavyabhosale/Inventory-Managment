import React from "react";
import DashboardDataTable from "@/components/DashboardDataTable";
import { db } from "@/lib/db";

const Dashboard = async () => {
  const [inventoryData, clients] = await db.$transaction([
    db.inventory.findMany(),
    db.user.findMany(),
  ]);

  const response = inventoryData?.map((inv) => {
    return { ...inv, clients };
  });
  return <DashboardDataTable data={response} />;
};

export default Dashboard;

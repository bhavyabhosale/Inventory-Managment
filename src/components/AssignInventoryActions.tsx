"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/actions/user";
import { toast } from "./ui/use-toast";

const AssignInventoryActions = ({ row }: any) => {
  const task = row.original;
  const client = task?.clients?.find((cli: any) => cli.id == task?.userId);

  const handleChange = async (userId: string) => {
    const res: any = await updateUser(task?.id, userId, false);

    if (res?.error) {
      toast({ title: res?.error });
    } else {
      toast({ title: "Inventory successfully transfered" });
    }
  };
  return (
    <div className="flex gap-8">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              client ? `Transfer to ${client?.name}` : "Select an client"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a user</SelectLabel>
            {task?.clients?.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>
                {item?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssignInventoryActions;

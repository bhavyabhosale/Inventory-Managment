import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FormInput from "./FormInput";
import { addUpdateInventory } from "@/actions/user";
import { toast } from "./ui/use-toast";

type Props = {
  title: string;
  data: any;
};
const InventoryData = ({ title, data }: Props) => {
  const handleSubmit = async (formData: FormData) => {
    const response: any = await addUpdateInventory(formData, data);
    if (response?.error) {
      toast({ title: response?.error });
    } else {
      toast({ title: "inventory created successfully" });
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">{title}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <form action={handleSubmit}>
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex flex-col gap-5">
                <FormInput
                  type="text"
                  name="name"
                  label="Inventory Name"
                  placeholder="Enter the name"
                  defaultValue={data?.name}
                />
                <FormInput
                  type="text"
                  name="description"
                  label="Enter Inventory Description"
                  defaultValue={data?.description}
                />
                <FormInput
                  type="text"
                  name="billImageUrl"
                  label="Enter invoice link"
                  defaultValue={data?.billImageUrl}
                />
                <FormInput
                  type="text"
                  name="cost"
                  label="Enter Inventory Cost"
                  defaultValue={data?.cost}
                />
              </div>
            </div>
            <Button type="submit" className="mt-5">
              {title}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InventoryData;
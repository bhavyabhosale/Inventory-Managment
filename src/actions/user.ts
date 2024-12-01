"use server";

import { db } from "@/lib/db";
import { auth, signIn } from "../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const loginSignup = async (formData: FormData, isLogin: boolean) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await db.user.findUnique({
    where: { email },
    select: { isAdmin: true },
  });

  const res = await signIn("credentials", {
    name,
    email,
    password,
    isLogin,
    redirect: true,
    callbackUrl: "/",
  })
    .then(() => {
      redirect("/");
    })
    .catch((err) => {
      if (err?.toString() == "Error: NEXT_REDIRECT") {
        user?.isAdmin ? redirect("/dashboard") : redirect("/");
      } else return { error: err?.type };
    });

  if (!isLogin && res?.error) {
    return { error: "credentials already exists" };
  } else {
    return { error: "wrong credentials" };
  }
};

// update user
export const updateUser = async (
  id: string,
  userId: string,
  isAdmin: boolean
) => {
  let inventory;
  try {
    inventory = await db.inventory.update({
      where: { id },
      data: { userId },
    });

    if (!inventory) {
      return { error: "failed to transfer" };
    }
  } catch (error) {
    return { error: "failed to transfer" };
  }

  revalidatePath(`${isAdmin ? "/dashboard" : "/"}`);
  return inventory;
};

// update user role
export const updateUserRole = async (
  formData: FormData,
  isAdmin: boolean,
  data: any
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }
  const checkEmail = await db.user.findUnique({ where: { email } });
  if (!checkEmail) return { error: "User not found" };

  let user;
  try {
    user = await db.user.update({
      where: { id: data?.id },
      data: { name, email, password, isAdmin },
    });
    console.log(user, "user");
    if (!user) {
      return { error: "User not udpated" };
    }
  } catch (error) {
    return { error: "User not udpated" };
  }

  revalidatePath(`/dashboard/clients`);
  return user;
};

// add/update inventory

export const addUpdateInventory = async (formData: FormData, data: any) => {
  const session = await auth();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const getCost = formData.get("cost") as string;
  const billImageUrl = formData.get("billImageUrl") as string;
  const cost = Number(getCost);

  const user = await db.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!name || !description || !cost) {
    return { error: "All fields are required" };
  }

  let inventory;
  try {
    if (data?.id) {
      inventory = await db.inventory.update({
        where: { id: data?.id },
        data: { name, description, cost,billImageUrl, userId: user?.id },
      });
    } else {
      inventory = await db.inventory.create({
        data: { name, description, cost,billImageUrl, userId: user?.id },
      });
    }
    if (!inventory) {
      return { error: "failed to create inventory" };
    }
  } catch (error) {
    return { error: "failed to create inventory" };
  }

  revalidatePath(`/dashboard`);
  return inventory;
};

// delete inventory

export const DeleteInventory = async (id: string) => {
  try {
    const result = await db.inventory.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    if (!result) {
      return { error: "inventory not deleted" };
    }
  } catch (error) {
    return { error: "inventory not deleted" };
  }
};

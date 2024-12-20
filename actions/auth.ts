"use server";

import { signUpSchema } from "@/app/models/authSchema";
import { db } from "@/db";
import { user } from "@/db/schema/user";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// New User Register
export async function newUser(_prevState: any, formData: FormData) {
  const rawdata = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const validation = signUpSchema.safeParse(rawdata);
  if (!validation.success) {
    return {
      validationErrors: {
        name: validation.error.flatten().fieldErrors.name,
        email: validation.error.flatten().fieldErrors.email,
        password: validation.error.flatten().fieldErrors.password,
      },
    };
  }

  const data = validation.data;
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    await db.insert(user).values({ ...data, password: hashedPassword });
    revalidatePath("/auth/sign-up");
    return {
      message: "New User Registered Successfully",
    };
  } catch (error) {
    return {
      error: `Something went wrong. Sign Up Failed ${error}`,
    };
  }
}

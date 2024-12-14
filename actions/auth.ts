/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signUpSchema } from "@/app/models/authSchema";
import { revalidatePath } from "next/cache";

export async function authLogin(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validation = signUpSchema.safeParse(rawData);

    if (!validation.success) {
      return {
        validationError: {
          emailValidationError:
            validation?.error.flatten().fieldErrors.email?.[0] || null,
          passwordValidationError:
            validation?.error.flatten().fieldErrors.password || null,
        },
      };
    }

    const parsedData = validation.data;

    if (!rawData) {
      return {
        message: "Invalid Data",
      };
    }
    revalidatePath("/auth/login");
    return {
      data: parsedData,
    };
  } catch (error) {
    return {
      error: `Something went wrong. Login Failed try again ${error}`,
    };
  }
}

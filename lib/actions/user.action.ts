"use server";

import { getUserByEmail } from "../helper-functions/get-user-by-email";
import { sendEmailOTP } from "../helper-functions/send-email-otp";

export const createAccount = async ({
    fullName,
    email,
}: {
    fullName: string;
    email: string;
}) => {
    const existingUser = await getUserByEmail(email);
    const accountId = await sendEmailOTP({ email });

    if (!accountId) throw new Error("Failed to send an OTP");
};

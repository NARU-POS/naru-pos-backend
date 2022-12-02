import { model, Schema } from "mongoose";
import { IUser, USER_ROLE } from "@src/interfaces";

const userSchema = new Schema<IUser>(
    {
        loginId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: USER_ROLE,
            default: USER_ROLE.GUEST,
        },
    },
    { collection: "user" },
);

export const UserModel = model<IUser>("User", userSchema);

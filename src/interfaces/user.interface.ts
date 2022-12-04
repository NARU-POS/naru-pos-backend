import { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    loginId: string;
    password: string;
    role?: USER_ROLE;
}

export enum USER_ROLE {
    GUEST = "guest",
    ADMIN = "admin",
}

export interface JWT_AUTH_DATA {
    userId: Types.ObjectId;
    role: USER_ROLE;
}

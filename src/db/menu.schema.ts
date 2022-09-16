import { Schema, model } from "mongoose";
import { IMenu } from "@src/models/db.interface";

const menuSchema = new Schema<IMenu>({});

export const menuModel = model<IMenu>("Menu", menuSchema);

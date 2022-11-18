import "dotenv/config";
import mongoose from "mongoose";
import { MenuModel } from "@src/db/menu.schema";
import { logger } from "@src/utils/configLogger";

const DB_URL = process.env.MONGODB_URL || "Please insert your MongoDB";

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(DB_URL);
    const db = mongoose.connection;

    db.on("connected", () => logger.info("Connect Success MongoDB"));
    db.on("error", (error) => logger.error(`Connect Fail MongoDB \n ${error}`));
}

export { MenuModel };

import "dotenv/config";
import mongoose from "mongoose";
import { UserModel } from "@src/db/user.schema";
import { PostModel } from "@src/db/post.schema";
import { QuizModel } from "@src/db/quiz.schema";
import { NewsModel } from "@src/db/news.schema";
import { BinsModel } from "@src/db/bins.schema";
import { RobotModel } from "@src/db/robot.schema";
import { TrashModel } from "@src/db/trash.schema";

const DB_URL =
    process.env.MONGODB_URL ||
    "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(DB_URL);
    const db = mongoose.connection;

    db.on("connected", () => console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL));
    db.on("error", (error) =>
        console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error),
    );
}

export { UserModel, QuizModel, TrashModel, NewsModel, BinsModel, PostModel, RobotModel };

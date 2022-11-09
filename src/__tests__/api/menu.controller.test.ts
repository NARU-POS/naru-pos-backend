import app from "@src/app";
import { STATUS_200_OK } from "@src/utils/statusCode";
import request from "supertest";

describe("MENU API", () => {
    it("MENU GET/ 메뉴 목록을 응답받는다.", async () => {
        const res = await request(app).get("/menus");
        expect(res.status).toBe(STATUS_200_OK);
    });
});

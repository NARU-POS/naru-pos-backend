import app from "@src/app";
import request from "supertest";
import { STATUS_200_OK, STATUS_404_NOTFOUND } from "@src/utils/statusCode";

it("NARU GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(STATUS_200_OK);
    expect(res.body.message).toEqual("Naru POS backend");
});

it("NARU GET *", async () => {
    const res = await request(app).get("/blankpage");
    expect(res.status).toBe(STATUS_404_NOTFOUND);
    expect(res.body.message).toEqual("요청하신 페이지를 찾을 수 없습니다.");
});

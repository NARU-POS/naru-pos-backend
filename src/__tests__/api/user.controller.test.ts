import app from "@src/app";
import bcrypt from "bcrypt";
import request from "supertest";
import { Types } from "mongoose";
import { UserService } from "@src/service";
import { IUser, USER_ROLE } from "@src/interfaces";
import { createAccessToken } from "@src/utils/jwt";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";

describe("USER API", () => {
    const mockService = new UserService();

    const mockUser = {
        loginId: "naru",
        password: "password",
        role: USER_ROLE.ADMIN,
    };

    const mockUser2 = {
        loginId: "handwoong",
        password: "secret",
        role: USER_ROLE.ADMIN,
    };

    const mockUpdateUser = {
        loginId: "naru",
        password: "changePassword",
        role: USER_ROLE.GUEST,
    };

    const mockCreated: { data?: Partial<IUser>; token?: string } = {};
    beforeEach(async () => {
        mockCreated.data = await mockService.createUser(mockUser);
        mockCreated.token = createAccessToken(
            mockCreated.data._id as Types.ObjectId,
            USER_ROLE.ADMIN,
        );
    });

    it("USER GET /users/current 현재 로그인되어 있는 사용자를 조회한다.", async () => {
        const res = await request(app)
            .get("/users/current")
            .set("Authorization", `Bearer ${mockCreated.token}`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.loginId).toEqual(mockUser.loginId);
        expect(res.body.role).toEqual(USER_ROLE.GUEST);
    });

    it("USER POST /users/login 사용자가 로그인한다.", async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        const res = await request(app).post("/users/login").send(mockUser);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toHaveProperty("token");
    });

    it("USER POST /users/register 사용자를 생성한다.", async () => {
        const res = await request(app).post("/users/register").send(mockUser2);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body).toHaveProperty("_id");
    });

    it("USER PUT /users/:userId 사용자 정보를 수정한다.", async () => {
        const res = await request(app)
            .put(`/users`)
            .set("Authorization", `Bearer ${mockCreated.token}`)
            .send(mockUpdateUser);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toHaveProperty("_id");
    });

    it("USER DELETE /users/:userId 사용자를 삭제한다.", async () => {
        const res = await request(app)
            .delete(`/users`)
            .set("Authorization", `Bearer ${mockCreated.token}`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("회원탈퇴에 성공하였습니다.");
    });
});

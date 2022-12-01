import { Types } from "mongoose";
import { IUser, USER_ROLE } from "@src/interfaces";
import { UserService } from "@src/service/user.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST } from "@src/utils/statusCode";

describe("USER SERVICE LOGIC", () => {
    const mockService = new UserService();

    const mockUser = {
        loginId: "naru",
        password: "password",
        role: USER_ROLE.ADMIN,
    };

    const mockUpdateUser = {
        loginId: "naru",
        password: "changePassword",
        role: USER_ROLE.GUEST,
    };

    const mockCreated: { data?: Partial<IUser> } = {};
    beforeEach(async () => {
        mockCreated.data = await mockService.createUser(mockUser);
    });

    it("ID값으로 유저를 조회한다.", async () => {
        const foundUser = await mockService.getUserInfo(
            mockCreated?.data?._id?.toString() as string,
        );
        expect(foundUser.loginId).toEqual(mockUser.loginId);
        expect(foundUser.password).toBeUndefined();
        expect(foundUser.role).toEqual(mockUser.role);
    });

    it("유저가 회원가입에 성공하면 유저 정보를 반환한다.", async () => {
        expect(mockCreated.data).toHaveProperty("_id");
        expect(mockCreated.data?.loginId).toEqual(mockUser.loginId);
        expect(mockCreated.data?.password).toBeUndefined();
        expect(mockCreated.data?.role).toEqual(mockUser.role);
    });

    it("유저가 로그인에 성공하면 token을 발급한다.", async () => {
        await mockService.createUser({ loginId: "test", password: "secret" });
        const loginUser = await mockService.login({ loginId: "test", password: "secret" });
        expect(loginUser.token).toBeTruthy();
    });

    it("유저 정보를 업데이트한다.", async () => {
        const updatedUser = await mockService.updateUser(
            mockCreated.data?._id?.toString() as string,
            mockUpdateUser,
        );
        expect(updatedUser.loginId).toEqual(mockUpdateUser.loginId);
        expect(updatedUser.password).toBeUndefined();
        expect(updatedUser.role).toEqual(mockUpdateUser.role);
    });

    it("유저 정보를 삭제한다.", async () => {
        const isDeleteUser = await mockService.deleteUser(
            mockCreated.data?._id?.toString() as string,
        );
        expect(isDeleteUser.message).toEqual("회원탈퇴에 성공하였습니다.");
    });
});

describe("USER SERVICE ERROR HANDLING", () => {
    const mockService = new UserService();

    const mockUser = {
        loginId: "same",
        password: "password",
    };

    it("ID값으로 조회된 유저가 없으면 RequestError가 발생한다.", async () => {
        try {
            await mockService.getUserInfo(new Types.ObjectId().toString());
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("사용자를 찾을 수 없습니다.");
        }
    });

    it("로그인 시 사용자를 찾을 수 없으면 RequestError가 발생한다.", async () => {
        try {
            await mockService.login({ loginId: "null", password: "secret" });
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("사용자를 찾을 수 없습니다.");
        }
    });

    it("로그인 시 비밀번호가 다르다면 RequestError가 발생한다.", async () => {
        try {
            await mockService.createUser(mockUser);
            await mockService.login({ ...mockUser, password: "secret" });
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    });

    it("회원가입 시 아이디가 이미 사용중이면 RequestError가 발생한다.", async () => {
        try {
            await mockService.createUser(mockUser);
            await mockService.createUser(mockUser);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("이미 사용중인 아이디입니다.");
        }
    });

    it("회원정보 수정 시 사용자를 찾지 못하면 RequestError가 발생한다.", async () => {
        try {
            await mockService.updateUser(new Types.ObjectId().toString(), mockUser);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("사용자 정보를 찾을 수 없습니다.");
        }
    });

    it("회원탈퇴 시 유저 정보를 찾지 못하면 RequestError가 발생한다.", async () => {
        try {
            await mockService.deleteUser(new Types.ObjectId().toString());
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("사용자 정보를 찾을 수 없습니다.");
        }
    });
});

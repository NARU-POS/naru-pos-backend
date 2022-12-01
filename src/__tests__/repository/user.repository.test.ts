import { UserRepository } from "@src/repository";
import { IUser, USER_ROLE } from "@src/interfaces";

describe("USER REPOSITORY", () => {
    const mockRepository = new UserRepository();

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

    const mockCreated: { data?: IUser } = {};
    beforeEach(async () => {
        mockCreated.data = await mockRepository.create(mockUser);
    });

    it("USER findOne", async () => {
        const foundOneUser = await mockRepository.findOne(
            mockCreated?.data?._id?.toString() as string,
        );
        expect(foundOneUser?.loginId).toEqual(mockUser.loginId);
        expect(foundOneUser?.password).toBeUndefined();
        expect(foundOneUser?.role).toEqual(mockUser.role);
    });

    it("USER findByLoginId", async () => {
        const foundLoginId = await mockRepository.findByLoginId(
            mockCreated?.data?.loginId as string,
        );
        expect(foundLoginId?.loginId).toEqual(mockUser.loginId);
        expect(foundLoginId).toHaveProperty("password");
        expect(foundLoginId?.role).toEqual(mockUser.role);
    });

    it("USER isLoginIdExists", async () => {
        const mockTrueExists = await mockRepository.isLoginIdExists(mockUser.loginId);
        const mockFalseExists = await mockRepository.isLoginIdExists("test");
        expect(mockTrueExists).toHaveProperty("_id");
        expect(mockFalseExists).toBe(null);
    });

    it("USER create", async () => {
        expect(mockCreated.data).toHaveProperty("_id");
        expect(mockCreated.data?.loginId).toEqual(mockUser.loginId);
        expect(mockCreated.data?.password).toEqual(mockUser.password);
        expect(mockCreated.data?.role).toEqual(mockUser.role);
    });

    it("USER update", async () => {
        const updatedUser = await mockRepository.update(
            mockCreated?.data?._id?.toString() as string,
            mockUpdateUser,
        );
        expect(updatedUser?.loginId).toEqual(mockUpdateUser.loginId);
        expect(updatedUser?.password).toBeUndefined();
        expect(updatedUser?.role).toEqual(mockUpdateUser.role);
    });

    it("USER delete", async () => {
        const deletedUser = await mockRepository.delete(
            mockCreated?.data?._id?.toString() as string,
        );
        expect(deletedUser?.loginId).toEqual(mockUser.loginId);
        expect(deletedUser?.password).toBeUndefined();
        expect(deletedUser?.role).toEqual(mockUser.role);
    });
});

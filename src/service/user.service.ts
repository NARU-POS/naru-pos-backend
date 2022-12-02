import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { UserRepository } from "@src/repository";
import { IUser, USER_ROLE } from "@src/interfaces";
import { createAccessToken } from "@src/utils/jwt";
import { RequestError } from "@src/middlewares/errorHandler";

export class UserService {
    private readonly userRepository = new UserRepository();

    async getUserInfo(userId: string) {
        const foundUserInfo = await this.userRepository.findOne(userId);
        if (!foundUserInfo) throw new RequestError("사용자를 찾을 수 없습니다.");
        return foundUserInfo;
    }

    async createUser(userInfo: IUser) {
        delete userInfo.role;
        const { loginId, password } = userInfo;

        const foundLoginId = await this.userRepository.isLoginIdExists(loginId);
        if (foundLoginId) throw new RequestError("이미 사용중인 아이디입니다.");

        userInfo.password = await bcrypt.hash(password, 10);
        const createdUser: Partial<IUser> = await this.userRepository.create(userInfo);
        createdUser.password = undefined;
        return createdUser;
    }

    async login(userInfo: IUser) {
        const { loginId, password } = userInfo;
        const foundUser = await this.userRepository.findByLoginId(loginId);
        if (!foundUser) throw new RequestError("사용자를 찾을 수 없습니다.");

        const isCheckPassword = await bcrypt.compare(password, foundUser.password);
        if (!isCheckPassword) throw new RequestError("아이디 또는 비밀번호가 잘못되었습니다.");

        const accessToken = createAccessToken(
            foundUser._id as Types.ObjectId,
            foundUser.role as USER_ROLE,
        );
        return { token: accessToken };
    }

    async updateUser(userId: string, userInfo: IUser) {
        delete userInfo.role;
        userInfo.password = await bcrypt.hash(userInfo.password, 10);
        const updatedUser = await this.userRepository.update(userId, userInfo);
        if (!updatedUser) throw new RequestError("사용자 정보를 찾을 수 없습니다.");
        return updatedUser;
    }

    async deleteUser(userId: string) {
        const deletedUser = await this.userRepository.delete(userId);
        if (!deletedUser) throw new RequestError("사용자 정보를 찾을 수 없습니다.");
        return { message: "회원탈퇴에 성공하였습니다." };
    }
}

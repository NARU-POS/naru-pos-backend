import { UserModel } from "@src/db";
import { IUser } from "@src/interfaces";

export class UserRepository {
    private readonly userModel = UserModel;

    findOne(userId: string) {
        return this.userModel.findById(userId).select("-password").exec();
    }

    findByLoginId(loginId: string) {
        return this.userModel.findOne({ loginId }).exec();
    }

    isLoginIdExists(loginId: string) {
        return this.userModel.exists({ loginId }).exec();
    }

    create(userInfo: IUser) {
        return this.userModel.create(userInfo);
    }

    update(userId: string, userInfo: IUser) {
        return this.userModel
            .findByIdAndUpdate(userId, userInfo, { new: true })
            .select("-password")
            .exec();
    }

    delete(userId: string) {
        return this.userModel.findByIdAndDelete(userId).select("-password").exec();
    }
}

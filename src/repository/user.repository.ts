import { UserModel } from "@src/db";
import { IUser } from "@src/interfaces/user.interface";

export class UserRepository {
    private readonly userModel = UserModel;

    findOne(userId: string) {
        return this.userModel.findById(userId).exec();
    }

    create(userInfo: IUser) {
        return this.userModel.create(userInfo);
    }

    update(userId: string, userInfo: IUser) {
        return this.userModel.findByIdAndUpdate(userId, userInfo, { new: true }).exec();
    }

    delete(userId: string) {
        return this.userModel.findByIdAndDelete(userId).exec();
    }
}

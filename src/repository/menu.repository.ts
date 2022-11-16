import { MenuModel } from "@src/db";
import { IMenu } from "@src/models/db.interface";

export class MenuRepository {
    static findCategoryMenu(mainCategory: string, detailCategory: string) {
        return MenuModel.find({ category: mainCategory, detailCategory });
    }

    static find() {
        return MenuModel.find();
    }

    static create(menuInfo: IMenu) {
        return MenuModel.create(menuInfo);
    }

    static updateMenu(menuId: string, menuInfo: IMenu) {
        return MenuModel.findByIdAndUpdate(menuId, menuInfo, { new: true });
    }

    static deleteMenu(menuId: string) {
        return MenuModel.findByIdAndDelete(menuId);
    }
}

import { MenuModel } from "@src/db";
import { IMenu } from "@src/models/db.interface";

export class Menu {
    static findCategoryMenu(category: string) {
        return MenuModel.find({ category });
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

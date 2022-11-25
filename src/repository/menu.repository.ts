import { MenuModel } from "@src/db";
import { IMenu } from "@src/interfaces";
import { ICategory } from "@src/interfaces/menu.interface";

export class MenuRepository {
    private readonly menuModel = MenuModel;

    find(searchData: ICategory) {
        return this.menuModel.find(searchData);
    }

    findAll() {
        return this.menuModel.find();
    }

    create(menuInfo: IMenu) {
        return this.menuModel.create(menuInfo);
    }

    update(menuId: string, menuInfo: IMenu) {
        return this.menuModel.findByIdAndUpdate(menuId, menuInfo, { new: true });
    }

    delete(menuId: string) {
        return this.menuModel.findByIdAndDelete(menuId);
    }
}

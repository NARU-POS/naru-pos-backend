import { MenuModel } from "@src/db";
import { IMenu } from "@src/interfaces";
import { ICategory } from "@src/interfaces/menu.interface";

export class MenuRepository {
    private readonly menuModel = MenuModel;

    find(searchData: ICategory) {
        return this.menuModel.find(searchData).exec();
    }

    isFindNameExists(menuName: string) {
        return this.menuModel.exists({ name: menuName }).exec();
    }

    findByCategory() {
        return this.menuModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    detailCategory: { $addToSet: "$detailCategory" },
                },
            },
            { $project: { _id: 0, category: "$_id", detailCategory: 1 } },
            { $sort: { category: -1 } },
        ]);
    }

    create(menuInfo: IMenu) {
        return this.menuModel.create(menuInfo);
    }

    update(menuId: string, menuInfo: IMenu) {
        return this.menuModel.findByIdAndUpdate(menuId, menuInfo, { new: true }).exec();
    }

    delete(menuId: string) {
        return this.menuModel.findByIdAndDelete(menuId).exec();
    }
}

import { Menu } from "@src/models/menu.model";
import { MenuRepository } from "@src/repository";
import { IMenu } from "@src/interfaces/menu.interface";
import { RequestError } from "@src/middlewares/errorHandler";

export class MenuService {
    static getCategoryMenu(mainCategory: string, detailCategory: string) {
        return MenuRepository.findCategoryMenu(mainCategory, detailCategory);
    }

    static async getCategoryList() {
        const menuList: IMenu[] = await MenuRepository.find();
        return menuList.reduce((acc, menu) => {
            const filterCategory = Object.assign({}, acc);
            if (!filterCategory[menu.category]) filterCategory[menu.category] = [];
            filterCategory[menu.category] = [...filterCategory[menu.category], menu.detailCategory];
            filterCategory[menu.category] = [...new Set(filterCategory[menu.category])];
            return filterCategory;
        }, {} as any);
    }

    static async addMenu(menuInfo: IMenu) {
        const createMenu = new Menu(menuInfo);
        const createdMenu = await MenuRepository.create(createMenu);
        if (!createdMenu) throw new RequestError("메뉴 등록에 실패하였습니다.");
        return createdMenu;
    }

    static async updateMenu(menuId: string, menuInfo: IMenu) {
        const updateMenu = new Menu(menuInfo);
        const updatedMenu = await MenuRepository.update(menuId, updateMenu);
        if (!updatedMenu) throw new RequestError("해당 메뉴를 찾을 수 없습니다.");
        return updatedMenu;
    }

    static async deleteMenu(menuId: string) {
        const deletedMenu = await MenuRepository.delete(menuId);
        if (!deletedMenu) throw new RequestError("해당 메뉴를 찾을 수 없습니다.");
        return { message: "삭제가 완료되었습니다." };
    }
}

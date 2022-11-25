import { IMenu } from "@src/interfaces";
import { MenuRepository } from "@src/repository";
import { ICategory } from "@src/interfaces/menu.interface";

export class MenuService {
    private readonly menuRepository = new MenuRepository();

    getCategoryMenuList(targetCategory: ICategory) {
        return this.menuRepository.find(targetCategory);
    }

    async getCategoryList() {
        const menuList: IMenu[] = await this.menuRepository.findAll();
        return menuList.reduce((acc, menu) => {
            const filterCategory = Object.assign({}, acc);
            if (!filterCategory[menu.category]) filterCategory[menu.category] = [];
            filterCategory[menu.category] = [...filterCategory[menu.category], menu.detailCategory];
            filterCategory[menu.category] = [...new Set(filterCategory[menu.category])];
            return filterCategory;
        }, {} as any);
    }

    addMenu(menuInfo: IMenu) {
        return this.menuRepository.create(menuInfo);
    }

    updateMenu(menuId: string, menuInfo: IMenu) {
        return this.menuRepository.update(menuId, menuInfo);
    }

    deleteMenu(menuId: string) {
        return this.menuRepository.delete(menuId);
    }
}

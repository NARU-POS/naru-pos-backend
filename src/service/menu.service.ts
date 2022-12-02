import { IMenu } from "@src/interfaces";
import { MenuRepository } from "@src/repository";
import { RequestError } from "@src/middlewares/errorHandler";
import { ICategory, MENU_CATEGORY, VisualizationCategory } from "@src/interfaces/menu.interface";

export class MenuService {
    private readonly menuRepository = new MenuRepository();

    getCategoryMenuList(targetCategory: ICategory) {
        return this.menuRepository.find(targetCategory);
    }

    async getCategoryList() {
        const categoryList = await this.menuRepository.findByCategory();

        // 데이터 가공 및 순서 정렬
        return Object.values(MENU_CATEGORY).reduce((acc, key) => {
            const categoryVisualization = Object.assign({}, acc);
            const currentKeyData = categoryList.find((data) => data.category === key);
            categoryVisualization[key] = currentKeyData?.detailCategory;
            return categoryVisualization;
        }, {} as VisualizationCategory);
    }

    async createMenu(menuInfo: IMenu) {
        const foundMenuName = await this.menuRepository.isFindNameExists(menuInfo.name);
        if (foundMenuName) throw new RequestError("이미 사용중인 이름입니다.");
        const createdMenu = await this.menuRepository.create(menuInfo);
        return createdMenu;
    }

    async updateMenu(menuId: string, menuInfo: IMenu) {
        const updatedMenu = await this.menuRepository.update(menuId, menuInfo);
        if (!updatedMenu) throw new RequestError("메뉴 정보를 찾을 수 없습니다.");
        return updatedMenu;
    }

    async deleteMenu(menuId: string) {
        const deletedMenu = await this.menuRepository.delete(menuId);
        if (!deletedMenu) throw new RequestError("메뉴 정보를 찾을 수 없습니다.");
        return deletedMenu;
    }
}

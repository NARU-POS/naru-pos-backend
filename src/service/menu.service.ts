import { IMenu } from "@src/interfaces";
import { MenuRepository } from "@src/repository";
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

    /**
     * TODO createMenu, updateMenu, deleteMenu 에러 핸들링
     */
    createMenu(menuInfo: IMenu) {
        return this.menuRepository.create(menuInfo);
    }

    updateMenu(menuId: string, menuInfo: IMenu) {
        return this.menuRepository.update(menuId, menuInfo);
    }

    deleteMenu(menuId: string) {
        return this.menuRepository.delete(menuId);
    }
}

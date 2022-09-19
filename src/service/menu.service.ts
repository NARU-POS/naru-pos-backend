import { Menu } from "@src/repository";
import { IMenu } from "@src/models/db.interface";
import { RequestError } from "@src/middlewares/errorHandler";

export class MenuService {
    static getCategoryMenu(category: string) {
        return Menu.findCategory(category);
    }

    static getMenuList() {
        return Menu.find();
    }

    static async addMenu(menuInfo: IMenu) {
        const createdMenu = await Menu.create(menuInfo);
        if (!createdMenu) throw new RequestError("메뉴 등록에 실패하였습니다.");
        return createdMenu;
    }

    static async updateMenu(menuId: string, menuInfo: IMenu) {
        const updatedMenu = await Menu.updateMenu(menuId, menuInfo);
        if (!updatedMenu) throw new RequestError("해당 메뉴를 찾을 수 없습니다.");
        return updatedMenu;
    }

    static async deleteMenu(menuId: string) {
        const deletedMenu = await Menu.deleteMenu(menuId);
        if (!deletedMenu) throw new RequestError("해당 메뉴를 찾을 수 없습니다.");
        return { message: "삭제가 완료되었습니다." };
    }
}

import { MenuService } from "@src/service";
import { Menu } from "@src/models/menu.model";
import { MenuRepository } from "@src/repository";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST } from "@src/utils/statusCode";
import { IMenu, MENU_CATEGORY, MENU_DETAIL_CATEGORY } from "@src/interfaces/menu.interface";

describe("MENU SERVICE LOGIC", () => {
    const tempMenu = new Menu({
        name: "통새우 크림파스타",
        description: "맛있는 크림파스타",
        price: 10000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.CREAM,
    });

    const tempCategory = {
        mainCategory: "pasta",
        detailCategory: "cream",
    };

    const tempUpdateMenu = new Menu({
        name: "씨푸드 토마토파스타",
        description: "해산물이 풍부한 토마토 파스타",
        price: 12000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.TOMATO,
    });

    const testData: { createdMenu?: IMenu } = {};
    beforeEach(async () => {
        testData.createdMenu = await MenuService.addMenu(tempMenu);
    });

    it("카테고리에 맞는 메뉴를 반환한다.", async () => {
        const menuList = await MenuService.getCategoryMenu(
            tempCategory.mainCategory,
            tempCategory.detailCategory,
        );
        expect(menuList).toHaveLength(1);
        expect(menuList[0].name).toEqual(tempMenu.name);
        expect(menuList[0]).toMatchObject(tempMenu);
    });

    it("카테고리 목록을 반환한다.", async () => {
        const categoryList = await MenuService.getCategoryList();
        expect(categoryList).toHaveProperty(tempMenu.category);
        expect(categoryList.pasta).toHaveLength(1);
        expect(categoryList.pasta[0]).toEqual(tempMenu.detailCategory);
    });

    it("메뉴를 생성한다.", async () => {
        expect(testData.createdMenu).toHaveProperty("_id");
        expect(testData.createdMenu).toMatchObject(tempMenu);
    });

    it("메뉴를 수정한다.", async () => {
        const updatedMenu = await MenuService.updateMenu(
            testData?.createdMenu?._id?.toString() as string,
            tempUpdateMenu,
        );
        expect(updatedMenu).toHaveProperty("_id");
        expect(updatedMenu).toMatchObject(tempUpdateMenu);
    });

    it("메뉴를 삭제한다.", async () => {
        const deletedMenu = await MenuService.deleteMenu(
            testData?.createdMenu?._id?.toString() as string,
        );
        expect(deletedMenu).toHaveProperty("message");
        expect(deletedMenu.message).toEqual("삭제가 완료되었습니다.");
    });
});

describe("MENU SERVICE LOGIC ERROR HANDLING", () => {
    const tempMenu = new Menu({
        name: "통새우 크림파스타",
        description: "맛있는 크림파스타",
        price: 10000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.CREAM,
    });

    const tempUpdateMenu = new Menu({
        name: "씨푸드 토마토파스타",
        description: "해산물이 풍부한 토마토 파스타",
        price: 12000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.TOMATO,
    });

    it("메뉴 생성 후 생성된 메뉴가 없으면 RequestError가 발생한다.", async () => {
        MenuRepository.create = jest.fn().mockReturnValue(null);
        try {
            await MenuService.addMenu(tempMenu);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("메뉴 등록에 실패하였습니다.");
        }
    });

    it("메뉴 수정 후 수정된 메뉴가 없으면 RequestError가 발생한다.", async () => {
        MenuRepository.update = jest.fn().mockReturnValue(null);
        try {
            await MenuService.updateMenu("tempMenuObjectId", tempUpdateMenu);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("해당 메뉴를 찾을 수 없습니다.");
        }
    });

    it("메뉴 삭제 후 삭제된 메뉴가 없으면 RequestError가 발생한다.", async () => {
        MenuRepository.delete = jest.fn().mockReturnValue(null);
        try {
            await MenuService.deleteMenu("tempMenuObjectId");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("해당 메뉴를 찾을 수 없습니다.");
        }
    });
});

import { Types } from "mongoose";
import { MenuService } from "@src/service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST } from "@src/utils/statusCode";
import {
    IMenu,
    ICategory,
    MENU_CATEGORY,
    MENU_DETAIL_CATEGORY,
    MENU_STATUS,
} from "@src/interfaces";

describe("MENU SERVICE LOGIC", () => {
    const mockService = new MenuService();

    const mockMenu = {
        name: "통새우 크림파스타",
        description: "맛있는 크림파스타",
        price: 10000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.CREAM,
        spicy: 0,
        status: MENU_STATUS.BEST,
    };

    const mockCategory = {
        mainCategory: "pasta",
        detailCategory: "cream",
    };

    const mockUpdateMenu = {
        name: "씨푸드 토마토파스타",
        description: "해산물이 풍부한 토마토 파스타",
        price: 12000,
        notice: "unused",
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.TOMATO,
        spicy: 1,
        status: MENU_STATUS.NEW,
    };

    const mockCreated: { data?: IMenu } = {};
    beforeEach(async () => {
        mockCreated.data = await mockService.createMenu(mockMenu);
    });

    it("카테고리에 맞는 메뉴를 반환한다.", async () => {
        const menuList = await mockService.getCategoryMenuList({
            category: mockCategory.mainCategory,
            detailCategory: mockCategory.detailCategory,
        } as ICategory);
        expect(menuList).toHaveLength(1);
        expect(menuList[0].name).toEqual(mockMenu.name);
        expect(menuList[0]).toMatchObject(mockMenu);
    });

    it("카테고리 목록을 반환한다.", async () => {
        const categoryList = await mockService.getCategoryList();
        expect(categoryList).toHaveProperty(mockMenu.category);
        expect(categoryList[mockMenu.category]).toHaveLength(1);
        expect(categoryList[mockMenu.category][0]).toEqual(mockMenu.detailCategory);
    });

    it("메뉴를 생성한다.", async () => {
        expect(mockCreated.data).toHaveProperty("_id");
        expect(mockCreated.data).toMatchObject(mockMenu);
    });

    it("메뉴를 수정한다.", async () => {
        const updatedMenu = await mockService.updateMenu(
            mockCreated?.data?._id?.toString() as string,
            mockUpdateMenu,
        );
        expect(updatedMenu).toHaveProperty("_id");
        expect(updatedMenu).toMatchObject(mockUpdateMenu);
    });

    it("메뉴를 삭제한다.", async () => {
        const deletedMenu = await mockService.deleteMenu(
            mockCreated?.data?._id?.toString() as string,
        );
        expect(deletedMenu).toHaveProperty("_id");
        expect(deletedMenu).toMatchObject(mockMenu);
    });
});

describe("MENU SERVICE ERROR HANDLING", () => {
    const mockService = new MenuService();

    const mockMenu = {
        name: "통새우 크림파스타",
        description: "맛있는 크림파스타",
        price: 10000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.CREAM,
        spicy: 0,
        status: MENU_STATUS.BEST,
    };

    const mockUpdateMenu = {
        name: "씨푸드 토마토파스타",
        description: "해산물이 풍부한 토마토 파스타",
        price: 12000,
        notice: "unused",
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.TOMATO,
        spicy: 1,
        status: MENU_STATUS.NEW,
    };

    it("메뉴를 생성할 때 이미 사용중인 이름이 있다면 RequestError가 발생한다.", async () => {
        try {
            await mockService.createMenu(mockMenu);
            await mockService.createMenu(mockMenu);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("이미 사용중인 이름입니다.");
        }
    });

    it("메뉴 수정 시 메뉴를 찾을 수 없으면 RequestError가 발생한다.", async () => {
        try {
            await mockService.updateMenu(new Types.ObjectId().toString(), mockUpdateMenu);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("메뉴 정보를 찾을 수 없습니다.");
        }
    });

    it("메뉴 삭제 시 메뉴를 찾을 수 없으면 RequestError가 발생한다.", async () => {
        try {
            await mockService.deleteMenu(new Types.ObjectId().toString());
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("메뉴 정보를 찾을 수 없습니다.");
        }
    });
});

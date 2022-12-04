import { MenuModel } from "@src/db";
import { MenuRepository } from "@src/repository";
import { ICategory, IMenu } from "@src/interfaces";
import { MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/interfaces";

describe("MENU REPOSITORY", () => {
    const mockRepository = new MenuRepository();

    const mockMenu = {
        name: "통새우 크림파스타",
        description: "맛있는 크림파스타",
        price: 10000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.CREAM,
        spicy: 0,
        status: MENU_STATUS.BEST,
    };

    const tempCategory = {
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
        mockCreated.data = await mockRepository.create(mockMenu);
    });

    it("MENU findCategoryMenu", async () => {
        const foundCategoryMenu = await mockRepository.find({
            category: tempCategory.mainCategory,
            detailCategory: tempCategory.detailCategory,
        } as ICategory);
        expect(foundCategoryMenu).toHaveLength(1);
        expect(foundCategoryMenu[0]).toMatchObject(mockMenu);
    });

    it("MENU find", async () => {
        const foundMenuList = await mockRepository.findByCategory();
        expect(foundMenuList).toHaveLength(1);
        expect(foundMenuList[0]).toHaveProperty("category");
        expect(foundMenuList[0]).toHaveProperty("detailCategory");
    });

    it("MENU findByName", async () => {
        const mockTrueExists = await mockRepository.isFindNameExists(mockMenu.name);
        const mockFalseExists = await mockRepository.isFindNameExists("test");
        expect(mockTrueExists).toHaveProperty("_id");
        expect(mockFalseExists).toBe(null);
    });

    it("MENU create", async () => {
        expect(mockCreated.data).toHaveProperty("_id");
        expect(mockCreated.data).toMatchObject(mockMenu);
    });

    it("MENU update", async () => {
        const spyFn = jest.spyOn(MenuModel, "findByIdAndUpdate");
        const updatedMenu = await mockRepository.update(
            mockCreated?.data?._id?.toString() as string,
            mockUpdateMenu,
        );
        expect(updatedMenu).toMatchObject(mockUpdateMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it("MENU delete", async () => {
        const spyFn = jest.spyOn(MenuModel, "findByIdAndDelete");
        const deletedMenu = await mockRepository.delete(
            mockCreated?.data?._id?.toString() as string,
        );
        expect(deletedMenu).toMatchObject(mockMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });
});

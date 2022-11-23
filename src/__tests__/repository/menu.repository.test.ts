import { MenuModel } from "@src/db";
import { Menu } from "@src/models/menu.model";
import { MenuRepository } from "@src/repository";
import { IMenu, MENU_CATEGORY, MENU_DETAIL_CATEGORY } from "@src/interfaces/menu.interface";

describe("MENU REPOSITORY", () => {
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
        testData.createdMenu = await MenuRepository.create(tempMenu);
    });

    it("MENU findCategoryMenu", async () => {
        const foundCategoryMenu = await MenuRepository.findCategoryMenu(
            tempCategory.mainCategory,
            tempCategory.detailCategory,
        );
        expect(foundCategoryMenu).toHaveLength(1);
        expect(foundCategoryMenu[0]).toMatchObject(tempMenu);
    });

    it("MENU find", async () => {
        const foundMenuList = await MenuRepository.find();
        expect(foundMenuList).toHaveLength(1);
        expect(foundMenuList[0]).toMatchObject(tempMenu);
    });

    it("MENU create", async () => {
        expect(testData.createdMenu).toHaveProperty("_id");
        expect(testData.createdMenu).toMatchObject(tempMenu);
    });

    it("MENU update", async () => {
        const spyFn = jest.spyOn(MenuModel, "findByIdAndUpdate");
        const updatedMenu = await MenuRepository.update(
            testData?.createdMenu?._id?.toString() as string,
            tempUpdateMenu,
        );
        expect(updatedMenu).toMatchObject(tempUpdateMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it("MENU delete", async () => {
        const spyFn = jest.spyOn(MenuModel, "findByIdAndDelete");
        const deletedMenu = await MenuRepository.delete(
            testData?.createdMenu?._id?.toString() as string,
        );
        expect(deletedMenu).toMatchObject(tempMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });
});

import { MenuModel } from "@src/db";
import { MenuRepository } from "@src/repository";
import { tempCategory, tempMenu, tempUpdateMenu } from "@src/__tests__/setTestData";

describe("MENU REPOSITORY", () => {
    it("MENU findCategory", async () => {
        MenuModel.find = jest.fn().mockReturnValue([tempMenu]);
        const foundCategoryMenu = await MenuRepository.findCategory(
            tempCategory.mainCategory,
            tempCategory.detailCategory,
        );
        expect(foundCategoryMenu).toHaveLength(1);
        expect(foundCategoryMenu[0]).toMatchObject(tempMenu);
        expect(MenuModel.find).toHaveBeenCalledTimes(1);
    });

    it("MENU find", async () => {
        MenuModel.find = jest.fn().mockReturnValue([tempMenu]);
        const foundMenuList = await MenuRepository.find();
        expect(foundMenuList).toHaveLength(1);
        expect(foundMenuList[0]).toMatchObject(tempMenu);
        expect(MenuModel.find).toHaveBeenCalledTimes(1);
    });

    it("MENU create", async () => {
        const spyFn = jest.spyOn(MenuModel, "create");
        const createdMenu = await MenuRepository.create(tempMenu);
        expect(createdMenu).toMatchObject(tempMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it("MENU update", async () => {
        const spyFn = jest.spyOn(MenuModel, "findByIdAndUpdate");
        const createdMenu = await MenuRepository.create(tempMenu);
        const updatedMenu = await MenuRepository.update(
            createdMenu._id?.toString() as string,
            tempUpdateMenu,
        );
        expect(updatedMenu).toMatchObject(tempUpdateMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });

    it("MENU delete", async () => {
        const spyFn = jest.spyOn(MenuModel, "findByIdAndDelete");
        const createdMenu = await MenuRepository.create(tempMenu);
        const deletedMenu = await MenuRepository.delete(createdMenu._id?.toString() as string);
        expect(deletedMenu).toMatchObject(tempMenu);
        expect(spyFn).toHaveBeenCalledTimes(1);
    });
});

import { MenuService } from "@src/service";
import { MenuRepository } from "@src/repository";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST } from "@src/utils/statusCode";
import { tempCategory, tempMenu, tempUpdateMenu } from "@src/__tests__/setTestData";

describe("MENU SERVICE LOGIC", () => {
    it("카테고리에 맞는 메뉴를 반환한다.", async () => {
        MenuRepository.findCategory = jest.fn().mockReturnValue([tempMenu]);
        const menuList = await MenuService.getCategoryMenu(
            tempCategory.mainCategory,
            tempCategory.detailCategory,
        );
        expect(menuList).toHaveLength(1);
        expect(menuList[0].name).toEqual("통새우 크림파스타");
        expect(menuList[0]).toMatchObject(tempMenu);
        expect(MenuRepository.findCategory).toBeCalledTimes(1);
    });

    it("카테고리 목록을 반환한다.", async () => {
        MenuRepository.find = jest.fn().mockReturnValue([tempMenu, tempMenu]);
        const categoryList = await MenuService.getCategoryList();
        expect(categoryList).toHaveProperty("pasta");
        expect(categoryList.pasta).toHaveLength(1);
        expect(categoryList.pasta[0]).toEqual("cream");
        expect(MenuRepository.find).toBeCalledTimes(1);
    });

    it("메뉴를 생성한다.", async () => {
        MenuRepository.create = jest.fn().mockReturnValue(tempMenu);
        const createdMenu = await MenuService.addMenu(tempMenu);
        expect(createdMenu).toMatchObject(tempMenu);
        expect(MenuRepository.create).toBeCalledTimes(1);
    });

    it("메뉴를 수정한다.", async () => {
        MenuRepository.update = jest.fn().mockReturnValue(tempUpdateMenu);
        const updatedMenu = await MenuService.updateMenu("tempMenuObjectId", tempUpdateMenu);
        expect(updatedMenu).toMatchObject(tempUpdateMenu);
        expect(MenuRepository.update).toBeCalledTimes(1);
    });

    it("메뉴를 삭제한다.", async () => {
        MenuRepository.delete = jest.fn().mockReturnValue(tempMenu);
        const deletedMenu = await MenuService.deleteMenu("tempMenuObjectId");
        expect(deletedMenu).toHaveProperty("message");
        expect(deletedMenu.message).toEqual("삭제가 완료되었습니다.");
        expect(MenuRepository.delete).toBeCalledTimes(1);
    });
});

describe("MENU SERVICE LOGIC ERROR HANDLING", () => {
    it("메인카테고리가 unused일 경우 RequestError가 발생한다.", async () => {
        try {
            await MenuService.getCategoryMenu("unused", tempCategory.detailCategory);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toEqual("등록되지 않은 카테고리입니다.");
        }
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

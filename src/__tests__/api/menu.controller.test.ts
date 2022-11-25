import app from "@src/app";
import request from "supertest";
import { PREPARING_IMG } from "@src/utils/constants";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { MENU_CATEGORY, MENU_DETAIL_CATEGORY, MENU_STATUS } from "@src/interfaces";

describe("MENU API", () => {
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
        mainCategory: "stake",
        detailCategory: "unused",
    };

    const mockUpdateMenu = {
        name: "씨푸드 토마토파스타",
        description: "해산물이 풍부한 토마토 파스타",
        price: 12000,
        category: MENU_CATEGORY.PASTA,
        detailCategory: MENU_DETAIL_CATEGORY.TOMATO,
        spicy: 1,
        status: MENU_STATUS.NEW,
        photo_url: PREPARING_IMG,
    };

    it("MENU GET /menus/category 메뉴 카테고리 목록을 응답받는다.", async () => {
        const res = await request(app).get("/menus/category");
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toMatchObject({});
    });

    it("MENU GET /menus/:mainCategory/:detailCategory 카테고리에 해당하는 메뉴 목록을 응답받는다.", async () => {
        const res = await request(app).get(
            `/menus/${mockCategory.mainCategory}/${mockCategory.detailCategory}`,
        );
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toHaveLength(0);
    });

    it("MENU POST /menus 메뉴를 생성한다.", async () => {
        const res = await request(app).post("/menus").send(mockMenu);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body).toMatchObject(mockMenu);
    });

    it("MENU PUT /menus/:menuId 메뉴를 수정한다.", async () => {
        const createdMenu = await request(app).post("/menus").send(mockMenu);
        const res = await request(app).put(`/menus/${createdMenu.body._id}`).send(mockUpdateMenu);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toMatchObject(mockUpdateMenu);
    });

    it("MENU DELETE /menus/:menuId 메뉴를 삭제한다.", async () => {
        const createdMenu = await request(app).post("/menus").send(mockMenu);
        const res = await request(app).delete(`/menus/${createdMenu.body._id}`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("삭제가 완료되었습니다.");
    });
});

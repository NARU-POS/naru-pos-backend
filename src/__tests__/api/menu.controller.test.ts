import app from "@src/app";
import request from "supertest";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { tempCategory, tempMenu, tempUpdateMenu } from "@src/utils/tests/setTestData";

describe("MENU API", () => {
    it("MENU GET /menus/category 메뉴 카테고리 목록을 응답받는다.", async () => {
        const res = await request(app).get("/menus/category");
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toMatchObject({});
    });

    it("MENU GET /menus/:mainCategory/:detailCategory 카테고리에 해당하는 메뉴 목록을 응답받는다.", async () => {
        const res = await request(app).get(
            `/menus/${tempCategory.mainCategory}/${tempCategory.detailCategory}`,
        );
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toHaveLength(0);
    });

    it("MENU POST /menus 메뉴를 생성한다.", async () => {
        const res = await request(app).post("/menus").send(tempMenu);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body).toMatchObject(tempMenu);
    });

    it("MENU PUT /menus/:menuId 메뉴를 수정한다.", async () => {
        const createdMenu = await request(app).post("/menus").send(tempMenu);
        const res = await request(app).put(`/menus/${createdMenu.body._id}`).send(tempUpdateMenu);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toMatchObject(tempUpdateMenu);
    });

    it("MENU DELETE /menus/:menuId 메뉴를 삭제한다.", async () => {
        const createdMenu = await request(app).post("/menus").send(tempMenu);
        const res = await request(app).delete(`/menus/${createdMenu.body._id}`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("삭제가 완료되었습니다.");
    });
});

const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Naru Restaurant & Coffee API",
        description: "Naru Backend API Docs",
    },
    host: "localhost:5001",
    schemes: ["http"],
    securityDefinitions: {
        token: {
            type: "apiKey",
            in: "header",
            name: "authorization",
            description: "Naru AccessToken",
        },
    },
    tags: [
        { name: "menu", description: "나루 레스토랑 메뉴 API" },
        { name: "user", description: "사용자 API" },
    ],
    definitions: {
        requestToken:
            "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg5OThjYzhmNzBmM2E4M2ViNmU0ZmEiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE2Njk5NjE5NTEsImlzcyI6Im5hcnUuaGFuZHdvb25nLmNvbSJ9.biwq4RUiOhCwymqoBu3d29tsvqmFcyRIwlgpUBhVBcSy1k82Wi5Qm7T7YyeU3NdNI1_8r2R5MEuPa7r-CcWBGFfE-3wn_Gt_-xHdikRs9_H56xRuvsexqDb-P3E0F4jQBZGF_h6E9Ybi1PRUkZWzw3xkq2gLiiP1IJRg_NxgiUI",
        unauthorization: { message: "로그인이 필요한 서비스입니다." },
        forbidden: {
            message: "접근 권한이 없습니다.",
        },
        getMenuCategoryResponse: {
            stake: ["unused"],
            pizza: ["unused"],
            salad: ["unused"],
            pasta: ["tomato", "cream", "rose", "oil"],
            risotto: ["unused"],
            coffee: ["ice", "hot"],
            drink: ["unused"],
            "beer & wine": ["unused"],
            tea: ["ice", "hot"],
        },
        getMenuListResponse: [
            {
                status: "unused",
                _id: "636cc0a64d85ca00dad95c18",
                name: "아마트리치아나",
                description: "고소한 베이컨과 매콤한 블랜딩 토마토 소스로 맛을 낸 로마식 파스타",
                notice: "unused",
                price: 12000,
                category: "pasta",
                detailCategory: "tomato",
                spicy: 2,
                photo_url:
                    "https://res.cloudinary.com/dcahduceu/image/upload/v1668147672/naru/amatriciana.jpg",
                __v: 0,
            },
        ],
        pathMainCategory: "pasta",
        pathDetailCategory: "tomato",
        postMenuRequest: {
            name: "수제레몬차(HOT)",
            price: 5500,
            detailCategory: "hot",
            category: "tea",
            spicy: 0,
            status: "unused",
        },
        postMenuResponse: {
            name: "수제레몬차(HOT)",
            description: "",
            notice: "unused",
            price: 5500,
            category: "tea",
            detailCategory: "hot",
            status: "unused",
            spicy: 0,
            photo_url:
                "https://res.cloudinary.com/dcahduceu/image/upload/v1663314125/naru/preparation.png",
            _id: "637615eff40a91d94e608794",
            __v: 0,
        },
        pathPutMenu: "637615eff40a91d94e608794",
        putMenuRequest: {
            name: "수제레몬차(HOT)",
            description: "",
            notice: "unused",
            price: 10000,
            detailCategory: "hot",
            category: "tea",
            spicy: 0,
            status: "unused",
            photo_url:
                "https://res.cloudinary.com/dcahduceu/image/upload/v1663314125/naru/preparation.png",
        },
        putMenuResponse: {
            _id: "637615eff40a91d94e608794",
            name: "수제레몬차(HOT)",
            description: "",
            notice: "unused",
            price: 10000,
            category: "tea",
            detailCategory: "hot",
            status: "unused",
            spicy: 0,
            photo_url:
                "https://res.cloudinary.com/dcahduceu/image/upload/v1663314125/naru/preparation.png",
            __v: 0,
        },
        deleteMenuId: "637615eff40a91d94e608794",
        deleteMenuResponse: {
            deletedMenu: {
                _id: "6380a14ec6a7094c8c1bbca3",
                name: "통새우 크림파스타",
                description: "맛있는 크림파스타",
                notice: "unused",
                price: 10000,
                category: "pasta",
                detailCategory: "cream",
                status: "BEST",
                spicy: 0,
                photo_url:
                    "https://res.cloudinary.com/dcahduceu/image/upload/v1663314125/naru/preparation.png",
                __v: 0,
            },
            message: "삭제가 완료되었습니다.",
        },
        postUserRequest: {
            loginId: "naru",
            password: "secret",
        },
        postUserResponse: {
            loginId: "naru",
            role: "guest",
            _id: "638988efe9caa1845971705d",
            __v: 0,
        },
        loginUserRequest: {
            loginId: "naru",
            password: "secret",
        },
        loginUserResponse: {
            token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzg5OThjYzhmNzBmM2E4M2ViNmU0ZmEiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjE2Njk5NjE5NTEsImlzcyI6Im5hcnUuaGFuZHdvb25nLmNvbSJ9.biwq4RUiOhCwymqoBu3d29tsvqmFcyRIwlgpUBhVBcSy1k82Wi5Qm7T7YyeU3NdNI1_8r2R5MEuPa7r-CcWBGFfE-3wn_Gt_-xHdikRs9_H56xRuvsexqDb-P3E0F4jQBZGF_h6E9Ybi1PRUkZWzw3xkq2gLiiP1IJRg_NxgiUI",
        },
        putUserRequest: {
            loginId: "naru",
            password: "importantsecret",
        },
        putUserResponse: {
            _id: "638988efe9caa1845971705d",
            loginId: "naru",
            role: "guest",
            __v: 0,
        },
        deleteUserResponse: { message: "회원탈퇴에 성공하였습니다." },
        currentUserResponse: {
            _id: "638988efe9caa1845971705d",
            loginId: "naru",
            role: "guest",
            __v: 0,
        },
    },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/**/*.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);

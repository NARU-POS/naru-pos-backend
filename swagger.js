const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Naru Restaurant & Coffee API",
        description: "Naru Backend API Docs",
    },
    host: "localhost:5001",
    schemes: ["http"],
    securityDefinitions: {
        accessToken: {
            type: "apiKey",
            in: "header",
            name: "NARU-API-KEY", // name of the header, query parameter or cookie
            description: "Naru AccessToken",
        },
    },
    tags: [{ name: "menu", description: "나루 레스토랑 메뉴 API" }],
    definitions: {
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
            price: "5500",
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
            price: 10000,
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
            message: "삭제가 완료되었습니다.",
        },
    },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/**/*.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);

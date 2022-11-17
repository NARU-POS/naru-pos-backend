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
    },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/**/*.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);

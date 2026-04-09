import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auction API",
      version: "1.0.0",
    },
  },
  apis: ["./Router/*.js"], // 🔥 đọc swagger từ router
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
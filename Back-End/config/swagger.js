import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Filmy API",
      version: "1.0.0",
      description: "API documentation for Filmy project",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
      {
        url: "https://filmy-dusky.vercel.app/api",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };

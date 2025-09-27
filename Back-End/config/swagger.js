import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Filmy API",
      version: "1.0.0",
      description: "API documentation for Feilmy project",
    },
    servers: [
      {
        url: "http://localhost:5050/api", 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };

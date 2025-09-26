import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Feilmy API Documentation",
      version: "1.0.0",
      description: "API documentation for Feilmy project (Movies & Users)",
    },
    servers: [
      {
        url: "http://localhost:5050/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };

// import swaggerAutogen from "swagger-autogen";

// const doc = {
//   info: { title: "My API", description: "API docs" },
//   host: "localhost:5050",
//   schemes: ["http"],
  
// };

// const outputFile = "./swagger.json";
// const endpointsFiles = [
//   "../src/routes/movies.route.js",
//   "../src/routes/auth.route.js",
//   "../src/routes/users.route.js",
// ];

// swaggerAutogen(outputFile, endpointsFiles, doc);

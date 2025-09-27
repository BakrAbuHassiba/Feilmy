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
      schemas: {
        Movie: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique ID of the movie",
            },
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            genre: {
              type: "array",
              items: { type: "string" },
            },
            rating: {
              type: "number",
            },
            releaseYear: {
              type: "number",
            },
            views: {
              type: "number",
            },
            duration: {
              type: "number",
            },
            director: {
              type: "string",
            },
            cast: {
              type: "array",
              items: { type: "string" },
            },
            image: {
              type: "string",
            },
          },
          example: {
            _id: "64e8f1c3d2b6a2f8f9e2c8a1",
            title: "Inception",
            description: "A mind-bending thriller by Christopher Nolan",
            genre: ["Sci-Fi", "Thriller"],
            rating: 8.8,
            releaseYear: 2010,
            views: 10000,
            duration: 148,
            director: "Christopher Nolan",
            cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
            image: "https://image.tmdb.org/t/p/original/inception.jpg",
          },
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

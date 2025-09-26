import Ajv from "ajv";
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[A-Za-z]+( [A-Za-z]+)*$", // same regex as mongoose
      maxLength: 20,
    },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 60,
    },
    favoriteMovies: {
      type: "array",
      items: { type: "string" },
    },
    watchlist: {
      type: "array",
      items: { type: "string" },
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};

export default schema;

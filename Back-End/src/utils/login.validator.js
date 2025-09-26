import Ajv from "ajv";
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    },
    password: {
      type: "string",
      maxLength: 15,
      minLength: 6,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = schema;

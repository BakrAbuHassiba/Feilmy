import Ajv from "ajv";

const ajv = new Ajv();

const validate = (schema) => {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);

    if (!valid) {
      return res.status(400).json({
        msg: "invalid data",
        errors: ajv.errors,
      });
    }

    next();
  };
};

export default validate;

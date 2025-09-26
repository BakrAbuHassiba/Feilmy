const validateMongoId = (req, res, next, val) => {
  if (!/^[a-fA-F0-9]{24}$/.test(val)) {
    return res.json({ msg: "ID not valid" });
  } else {
    req.id = val;
    next();
  }
};

export default validateMongoId;

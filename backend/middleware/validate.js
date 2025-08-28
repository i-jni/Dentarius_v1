export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // parse + sanitize
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};
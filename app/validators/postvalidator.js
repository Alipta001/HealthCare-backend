const joi = require("joi");

const postvalidateSchema = joi.object({
  name: joi.string().min(3).max(15).required().messages({
    "string.empty": `"name" cannot be empty`,
    "string.min": '"name" should have at least {#limit} characters',
    "any.required": `"name" is required`,
  }),
  category: joi.string().min(3).max(10).required().messages({
    "string.empty": `"category" cannot be empty`,
    "string.min": `"category" should have at least {#limit} characters`,
    "any.required": `"category" is required`,
  }),
  price: joi.string().min(3).max(15).required().messages({
    "string.empty": `"price" cannot be empty`,
    "string.min": `"price" should have at least {#limit} characters`,
    "any.required": `"price" is required`,
  }),
});

module.exports = {
  postvalidateSchema,
};

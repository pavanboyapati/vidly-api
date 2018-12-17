const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  isGold: { type: Boolean },
  phone: { type: String, required: true }
});
function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .required()
      .min(5)
      .max(15)
  };
  return Joi.validate(customer, schema);
}
exports.Customer = mongoose.model("Customer", customerSchema);
exports.validate = validateCustomer;

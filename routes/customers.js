const express = require("express");
const { Customer, validate } = require("../schemas/customerSchema");

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  if (customers.length == 0)
    return res.status(404).send("No Customers found at this time");
  res.send(customers);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({ ...req.body });
  await customer.save();
  res.send(customer);
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!customer)
    return res.status(404).send(`No Customer found with id ${req.params.id}`);
  res.send(customer);
});
router.delete("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("ID is required");
  const customer = await Customer.findByIdAndRemove({ _id: req.params.id });
  if (!customer)
    return res.status(404).send(`No Customer found with id ${req.params.id}`);
  res.send(customer);
});

module.exports = router;

module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single user with _id
  router.get("/:_id", users.findOne);

  // Update a user with _id
  router.put("/:_id", users.update);

  // Delete a user with _id
  router.delete("/:_id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};

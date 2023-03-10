const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    post_code: req.body.post_code,
    contact_phone_number: req.body.contact_phone_number,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;

  User.getAll(first_name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params._id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with._id ${req.params._id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with._id " + req.params._id
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the _id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params._id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with _id ${req.params._id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with _id " + req.params._id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified _id in the request
exports.delete = (req, res) => {
  User.remove(req.params._id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with _id ${req.params._id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with _id " + req.params._sid
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

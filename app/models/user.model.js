const sql = require("./db.js");

// constructor
const User = function(user) {
  this._id = user._id;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.address = user.address;
  this.post_code = user.post_code;
  this.contact_phone_number = user.contact_phone_number;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};

User.create = (newTutorial, result) => {
  sql.query("INSERT INTO users SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { _id: res.insertId, ...newTutorial });
    result(null, { _id: res.insertId, ...newTutorial });
  });
};

User.findById = (_id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the _id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (first_name, result) => {
  let query = "SELECT * FROM users";

  if (first_name) {
    query += ` WHERE first_name LIKE '%${first_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (_id, user, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, last_name = ?, address = ?, post_code = ?, contact_phone_number = ?, email = ?, username = ?, password = ? WHERE `_id` = ?",
    [user.first_name, user.last_name, user.address, user.post_code, user.contact_phone_number, user.email, user.username, user.password, _id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the _id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { _id: _id, ...user });
      result(null, { _id: _id, ...user });
    }
  );
};

User.remove = (_id, result) => {
  sql.query("DELETE FROM users WHERE _id = ?", _id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the _id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with _id: ", _id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;

const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const dbConfig = require("./app/config/db.config.js");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect();

for (let i = 0; i < 100; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const address = faker.address.streetAddress();
  const postCode = faker.address.zipCode();
  const contactPhoneNumber = faker.phone.phoneNumberFormat('###-###-####');
  const email = faker.internet.email();
  const username = faker.internet.userName();
  const password = faker.internet.password();
  const query = `INSERT INTO users (first_name, last_name, address, post_code, contact_phone_number, email, username, password) VALUES ('${firstName}', '${lastName}', '${address}', '${postCode}', '${contactPhoneNumber}', '${email}', '${username}', '${password}')`;

  connection.query(query, function(err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Inserted ${results.affectedRows} row(s)`);
    }
  });
}

connection.end();
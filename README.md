## Project setup
Nodejs with MySQL
```
npm install
```

### SQL Query to create database and table
```
CREATE DATABASE user_management;
USE user_management;
CREATE TABLE users (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    post_code VARCHAR(10) NOT NULL,
    contact_phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Run local server
```
npm run serve
```

### Run database seeder using faker
```
npm run seeder
```

### Postman collection file attached in email
- Get all users
- Create user
- Update user by id
- Delete user by id
- Delete all users 
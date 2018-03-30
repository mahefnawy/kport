_________________________________________________________________________________
kport
------------------
An Article based application using REST API to perform CRUD operations on the database

Using:
------
1. Node.js Server
2. Express.js as backend framework
3. MongoDB
4. Mongoose ODM
5. Passport.js for Authentication (passport-local Strategy)
6. bcryptjs for password encryption
7. Pug (formerly known as Jade) for templating (templating engine)

Getting Started:
---------------
npm install => to install all dependencies to node_modules

N.B : Please Create config/config.js file including your data base and secret configuration as the following:
```
module.exports = {
  database: 'mongodb://<username>:<password>@ds213259.mlab.com:13259/<databasename>',
  secret: 'yoursecret'
};
```


npm start => to start the server and listen on port 3000


___________________________________________________________________________________

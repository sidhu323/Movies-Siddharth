const mysql = require('mysql');

function connectDatabase() {
  const connect = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'owOKux9BCI',
    password: 'Tu1PPJHfon',
    database: 'owOKux9BCI',
  });
  return connect;
}

module.exports = {
  connectDatabase,
};

var mysql = require(mysql)

var conn = mysql.createConnection({
host: 'localhost',
user: ShadowRoot,
password: '',
database: 'test database'
})

conn.connect(function(err) {
if (err) throw err;();
console.log('Database Connected');
})

module.exports = conn;

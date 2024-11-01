// express is a Node.js web application framework
// npm i express is node package manager install express
var express = require('express')
var app = express()

var session = require('express-session')
var conn =require('./dbConfig')

app.set('view engine', 'ejs')
//configure Express to use EJS as view engine
app.use(session( {
    secret: 'yoursecret',
    resave: true,
    saveUninitialized: true
}))

app.use('/public', express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.get('/', function(req, res) {
    res.render('home')
})
// this code setup a route for the root URL '/'

app.set('view engine', 'ejs')
//configure Express to use EJS as view engine
app.get('/beaches', function(req, res) {
    res.render('beaches')
})
// this code setup a route for the /beaches

app.set('view engine', 'ejs')
//configure Express to use EJS as view engine
app.get('/auckland', function(req, res) {
    res.render('auckland')
})
// this code setup a route for the /auckland

app.get('/login', function(req, res) {
    res.render('login.ejs')
})
// this code setup a route for the /login

app.post('/auth', function(req, res) {
    let name = req.body.username
    let password = req.body.password
    if (name && password) {
        conn.query('SELECT * FROM users where name = ? AND password = ?', [name, password],
            function(error, results, fields) {
                if (error) throw error
                if (results.length > 0) {
                    req.session.loggedin = true
                    req.session.username = name
                    res.redirect('/membersOnly')
                } else {
                    res.send('Incorrect Useername and/or Password!')
                }
                res.end()
            })
    } else {
        res.send('Please enter Username and Password!')
        res.end
    }     
})

//Users can access this if they are logged in
app.get('/membersOnly', function(req, res, next) {
    if (req.session.loggedin) {
        res.render('membersOnly')
    }
    else {
        res.send('Please login to view this page!')
    }
})

app.listen(3000)
console.log('Node app is running on prt 3000')
dbConfig.js

var mysql = require('mysql')
var conn  = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webclass2db'
})

conn.connect(function(err) {
    if (err) throw err
    console.log('Database connected')
})

module.exports = conn

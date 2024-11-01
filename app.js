var express = require('express');
var app = express();
var session = require('expression-session');
var conn = require('./dbConfig');


app.set('view engine','ejs');
app.use(session({
    secret: 'yoursecret',
    resave:true,
    saveUninitialized: true

}))

app.use('/public', express.static('public'));

app.get('/', function (req, res){
    res.render("home");
});

app.get('/login', function(req,res){
    res.render('login.ejs');
})

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
                    res.send('Incorrect Username and/or Password!')
                }
                res.end()
            })
    } else {
        res.send('Please enter Username and Password!')
        res.end
    }     
})






// app.get('/', (req, res) => {
//    res.send("Roy, GET Request Called")
// });


app.get('/auckland',function (req,res) {
    res.render("auckland");
})

app.get('/beaches',function (req,res) {
    res.render("beaches");
})

app.listen(3000);
console.log('Node app is running on port 3000');
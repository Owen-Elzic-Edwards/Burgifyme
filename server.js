const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

let connection;

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "burgify_me"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

app.get('/', function(req, res){
    connection.query(
        "SELECT * FROM burgers",
        function(err, data){
            if(err) throw err;
            res.render('index', {food: data})
        }
    )
});

app.post('/api', function(req, res){
    connection.query(
        "INSERT INTO burgers SET ?",
        req.body,
        function(err, result){
            if(err) throw err;
            res.sendStatus(200);
        }
    )
});

app.put('/api/:id', function(req, res){
    let id = req.params.id
    connection.query(
        "UPDATE burgers SET devoured = true WHERE id = ?",
        id,
        function(err, result){
            if(err) throw err;
            res.sendStatus(200);
        }
    )
})

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT); 
});
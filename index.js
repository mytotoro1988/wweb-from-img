var express = require('express');
var bodyParser = require('body-parser')

var userRoute = require('./routes/user.route')

var port = 3000;


var app = express();



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');


app.use('/users', userRoute);

app.get('/', function(req, res){
    res.render('index',{
        name: 'Mei'
    })
})

app.listen(port, function(){
    console.log('Server listening on port: ' + port)
});

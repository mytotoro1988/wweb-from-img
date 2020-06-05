var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var authRoute = require('./routes/auth.route')
var userRoute = require('./routes/user.route')

var authMiddleware = require('./middlewares/auth.middleware')

var port = 3000;


var app = express();



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', './views');



app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.get('/', function(req, res){
    res.render('index',{
        name: 'Mei'
    })
})

app.listen(port, function(){
    console.log('Server listening on port: ' + port)
});

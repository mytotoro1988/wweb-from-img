
var express = require('express');
var app = express();
var port = 3000;

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({users:[] })
  .write();





app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');



app.get('/', function(req, res){
    res.render('index',{
        name: 'Mei'
    })
})
app.get('/users', function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    })
})


//tttim kiem theo ten
app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matcheUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index',{
        users :matcheUsers
    })
})



//ttao nguoi dung moi
app.get('/users/create',function(req,res){
    res.render('users/create')
});
app.post('/users/create',function(req,res){

    db.get('users').push(req.body).write();
    res.redirect('/users');
  // chuyen nguoi dung ve trang truoc
    

})

app.listen(port, function(){
    console.log('Server listening on port: ' + port)
});
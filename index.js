
var express = require('express');
var app = express();
var port = 3000;
var shortid = require('shortid');
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


//tim kiem theo ten
app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matcheUsers = db.get('users').value().filter(function(user){
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
    req.body.id = shortid.generate();//tao id ngau nhien bang shortid
    db.get('users').push(req.body).write();
    res.redirect('/users');
  // chuyen nguoi dung ve trang truoc
    

})


app.get('/users/:id',function(req,res){//truyen id vao link moi
    var id = req.params.id;
    var user = db.get('users').find({id : id}).value();
    res.render('users/view',{
        user: user
    })
})

app.listen(port, function(){
    console.log('Server listening on port: ' + port)
});
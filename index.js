
var express = require('express');
var app = express();
var port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

var users = [
        { id: 1, name: 'Cuong' },
        { id: 2, name: 'Tung' },
        { id: 3, name: 'Viet' }
]

app.get('/', function(req, res){
    res.render('index',{
        name: 'Mei'
    })
})
app.get('/users', function(req, res){
    res.render('users/index',{
        users: users
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
app.post('users/create',function(req,res){

})

app.listen(port, function(){
    console.log('Server listening on port: ' + port)
});
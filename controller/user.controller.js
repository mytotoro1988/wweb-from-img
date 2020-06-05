var db = require('../db');
var shortid = require('shortid');


module.exports.index = function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    })
}
module.exports.search = function(req, res){
    var q = req.query.q;
    var matcheUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index',{
        users :matcheUsers
    })
}
module.exports.create = function(req,res){
    res.render('users/create')
}
module.exports.get = function(req,res){//truyen id vao link moi
    var id = req.params.id;
    var user = db.get('users').find({id : id}).value();
    res.render('users/view',{
        user: user
    })
}
module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();//tao id ngau nhien bang shortid
    var errors = [];
    //xac thuc
    if(!req.body.name){
        errors.push('No name')
    }
    if(!req.body.phone){
        errors.push('No phone number')
    }
    if(errors.length){
        res.render('users/create',{
            errors: errors,
            values:req.body
        })
        return;
    }


    db.get('users').push(req.body).write();
    res.redirect('/users');
  // chuyen nguoi dung ve trang truoc
    
    

}
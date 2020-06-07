var db = require('../db');
var md5 = require('md5')
module.exports.login = function(req, res){
    res.render('auth/login'
    )
}
module.exports.postLogin = function(req,res,next){
    //luc nay khi nguoi dung gui posst request len thi no se chua req.body.email va req.body.password
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email: email}).value();

    if(!user){
        res.render('auth/login',{
            errors:[
                'sai email hoac email chua duoc dang ki.'
            ],
        values: req.body
    })
    return;
    }
    var hashedPassword = md5(password)
    if(user.password !== hashedPassword){
        res.render('auth/login',{
            errors:[
                'sai password'
            ],
            values: req.body
    });
    return;
    }
    res.cookie('userId',user.id);
    res.redirect('/users');
}
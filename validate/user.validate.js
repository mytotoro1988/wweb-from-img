module.exports.postCreate = function(req,res,next){
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
    res.locals.success = true;
    next();
}
const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
    try{
        let token=req.header('x-token')
        if(!token){
            return res.status(400).send('No token found')
        }
        let decoded=jwt.verify(token,'jwtpassword')
        req.user=decoded.user;
        next()
    }
    catch(err){
        console.log(err)
        return res.status(400).send('Authentication Error')
    }
}
import jwt from 'jsonwebtoken'


export const isLoggedIn = async (req,res,next)=>{
    try{
        const token = req.cookies.token

        if(!token) res.status(400).json({error:"User not logged in"})

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.email = decoded
        next();
    }catch(err){
        console.log(err)
        res.json(err)
    }
}
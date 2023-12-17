import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import router from "../routes/routes.js";

const JWT_SECRET = process.env.JWT_SECRET

export const registerUser = async (request, response) => {
   
    try {
        const {name,email,password} = request.body;

        if(!email || !password || !name) response.status(401).json({error:"All fields are required"})

        const user =await User.findOne({email : {$eq : request.body.email}});
        if(user) {
            response.status(401).json({error:"User already exist"})
            return
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const newuser = new User({
            name,
            email,
            password:hashedPassword
        })

        await newuser.save()
        response.json(newuser)

    } catch (error) {
        console.error(error.message);
        return response.status(500).json({error: error.message});
    }

    
}

export const loginUser = async(req,res)=>{

    try {
        
        const {email,password} = req.body
        console.log('hello')

        if(!email || !password){
            res.status(401).json({error:"All fields are required"})
            return
        }

        const user =await User.findOne({email : {$eq : email}})

        if(!user) {
            res.status(401).json({error:"Invalid Credentials"})
            return
        }

        if(bcrypt.compareSync(password,user.password)){
            const token = jwt.sign({
                email: user.email,
              }, 
              process.env.JWT_SECRET);
    
    
            res.cookie('token',token,{
                expires : new Date(Date.now() + 25892000000), // 30 * 24 * 60 * 60 * 1000
                secure : true,
                httpOnly : true
            })
    
    
            res.json({msg:'Login successful'})
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({error: error.message});
    }

    
}

export const getUser = async (req,res)=>{
    const user = User.findOne({email:req.email})

    if(!user) res.status(401).json({error:"User does not exist"})

    res.json(user)
}



export const home = (req,res)=>{
    res.json("hello")
}
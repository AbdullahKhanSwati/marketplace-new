
import jwt from  "jsonwebtoken"
import Admin from "../Models/AdminModel.js"


const registerController = async(req,res)=>{

 
    
    try {
        const { email, password } = req.body;
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).send({ 
            message: "Admin already exists",
            success:false,

         });
      }
  
      // Create new admin
      
      const admin = await new Admin({
        email:email,
        password:password
      }).save();
  
      return res.status(201).send({ 
        message: "Admin added successfully",
        success:true,
        admin
       });
    } catch (error) {
      res.status(500).send({ message: "Internal server error", error });
    }
}



const loginController = async(req,res)=>{

    try {

        const {email , password} = req.body;
        if(!email || !password){
           return res.status(404).send({
                success:false,
                message:"empty username or password",
                
            })
        }
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(404).send({
                success:false,
                message:"admin not found , please register first"
            })
        }

       
        if(admin.password !== password){
            return res.status(200).send({
                success:false,
                message:"invalid credentials"
            })
        }

//Token
const token = await jwt.sign({_id:admin._id},process.env.JWT_SECRET,{expiresIn:"7d"});
 return res.status(200).send({
    success:true,
    message:"login successfully",
    admin:{
        email:admin.email,
    },
    token
})

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"login error",
            error
        })
    }
}

export{registerController,loginController};
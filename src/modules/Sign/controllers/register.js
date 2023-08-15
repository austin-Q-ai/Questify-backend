import { successResponse } from "../../../utils";
import jwt from 'jsonwebtoken';
import UserModel from "../../User/model";


export const registerController = async (req, res) => {
    const email=req.body.email
    let password=req.body.password

    if(email=="" || password=="" ){
        res.status(400).json({ message: 'Please fill out all the fields!' });
    }

    try{
        let userExists= await UserModel.findOne({email})
        if(userExists!=null){
            res.status(400).json({ message: 'Email exists!' });
        }
    
        password= await bcrypt.hash(password,10)
        
        const user= await new User({email,password})
       
            await user.save()
            req.session.token=user._id
            res.redirect('/')
    }catch (err) {
        res.status(400).json({ message: err });
    }
};

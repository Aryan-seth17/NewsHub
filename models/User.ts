import mongoose,{Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";
import { Interface } from "node:readline";


export interface IUser { // TS me Pahle Define krne hota hai
    email:string;
    Password:string;
    _id?:mongoose.Types.ObjectId;
    createdAtp?:Date;
    updateAT?: Date;
}

const userSchema = new Schema<IUser>(
    {
       email:{type:String, required:true, unique:true},
       Password:{type:String, required:true}
    },
    {
        timestamps:true
    }
);

userSchema.pre('save', async function(next){
    if(this.isModified("Password")){
        this.Password = await bcrypt.hash(this.Password,10)
    }
    next();
});

const User = models?.User || model<IUser>("User, userSchema")

export default User
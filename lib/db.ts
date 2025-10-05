import mongoose  from "mongoose";
import { buffer } from "stream/consumers";



const MONGOOSE_URI = process.env.MONGODB_URL!;

if(!MONGOOSE_URI){
    throw new Error("plese define mongo_url in env variable")
}

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {conn:null, promise:null}
}


export async function conectedTodatabase(){
    if(cached.conn){
        return cached.conn;
    }


if (!cached.promise){
       
     const Opts = {
           bufferCommands:true,
           maxPoolSize:10
     }

    mongoose
    .connect(MONGOOSE_URI, Opts)
    .then(() => mongoose.connection)
}


try {
    cached.conn = await cached.promise;
} catch (error) {
    cached.promise = null
    throw error
}
return cached.conn
}

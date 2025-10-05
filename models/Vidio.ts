import { timeStamp } from "console";
import mongoose,{Schema, model, models} from "mongoose";
import { title } from "process";
 


export const VIDEO_DIMENSIONS ={
    width: 1080,
    heigth:1920
} as const;

export interface IVidio {
    _id?:string;
    title:string;
    descripation:string;
    vidioUrl:string;
    thumbnaiUrl:string;
    controls:boolean;
    transformation:{
        height:number;
        width:number;
        quality?: number;
    };
}


const vidioSchema = new Schema(
    {
        title:{type:String, require:true },
        descripation:{type:String, require:true },
        vidioUrl:{type:String, require:true },
        thumbnaiUrl:{type:String, require:true },
        controls:{type:Boolean, default:true },
        transformation:{
            height:{type:Number, default:VIDEO_DIMENSIONS.heigth },
            width:{type:Number, default:VIDEO_DIMENSIONS.width },
            quality:{type:Number, min:1, max:100 },
        },
    },
    {
        timestamps:true
    }
);

const Vidio = models?.Vidio || model<IVidio>("VIdio",vidioSchema);

export default Vidio;


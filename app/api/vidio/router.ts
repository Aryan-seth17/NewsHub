 import {conectedTodatabase} from "@/app/lib"
import { authOptions } from "@/lib/auth"
import Vidio, { IVidio } from "@/models/Vidio"
import { error } from "console"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"


export async function GET() {
    try {
        await conectedTodatabase()
        const vidios = await Vidio.find({}).sort({createdAt: -1}).lean()

        if(!vidios || vidios.length === 0 ) {
           
            return NextResponse.json([],{status:200})

        }
        return NextResponse.json(vidios)
        
    } catch (error) {
        return NextResponse.json({error: "faild to fatch Vidios"},
            {status:500}
        )
    }
    
}

export async function POST(request:NextRequest){
    try {
       const session = await getServerSession(authOptions)
    
       if(!session){
        return NextResponse.json({error:"Unathorized User "},
            {status:401}
        )
       }
        await conectedTodatabase()

        const body: IVidio = await request.json()
         if(
            !body.title||
            !body.descripation||
            !body.vidioUrl||
            !body.thumbnaiUrl
         ){
            return NextResponse.json({error:"Missing Requared Fild "},
                {status:400}
            );
         }

         const vidioData = {
            ...body,
            controls:body?.controls ?? true,
            transformation:{
                height:1920,
                width:1080,
                quality: body.transformation?.quality ?? 100

            },
         };

         const newVidio = await Vidio.create(vidioData)

         return NextResponse.json(newVidio)



    } catch (error) {
        return NextResponse.json(
            {error:"Faild to create to Vidio"},
            {status:500}
        )
        
    }
}

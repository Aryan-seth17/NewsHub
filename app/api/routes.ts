import {conectedTodatabase} from "@/lib/db"  // For Use Registration
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";



export async function POST(request: NextRequest) {

    try {
        const {email, password} =  await request.json()
        
        if( !email || !password ){
            return NextResponse.json(
                {error: " Email And password requard"},
                {status:400}
            )
        }

        await conectedTodatabase()

        const existingUser = await User.findOne({email})
        if( existingUser){
            return NextResponse.json(
                {error: " User is alredy exist"},
                {status:400}
            )
        }

        await User.create({
            email,
            password
        })
    
        return NextResponse.json(
            {massege:"User registereed successfully"}
        )

        } catch (error) {
            console.log("Registretion error" ,error)
            return NextResponse.json(
                {error: "Registretion faild"},
                {status:400}
            )
        
    }
    
}

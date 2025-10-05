 
/*import GithubProvider from "next-auth/providers/github"  Ye gite se login ke liye ha    nEXT aUTH DOCUMENTION ME DIYA HI

export const authOptions: NextAuthOptions ={           
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],};*/

import {conectedTodatabase} from "@/lib/db";
import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email";
import bcrypt from "bcryptjs";
import { Session } from "inspector/promises";
import User from "@/models/User";

  export const authOptions: NextAuthOptions ={          
    providers: [
             CredentialsProvider({
               // Name: Credential, // optional 
                credentials:{                          // Jo chaihiye Aur data type
                    Email: {label:"Email", type:"text" },
                    passward: {label:"Passward", type:"Passward" }
                },

                async authorize(credentials){
                    if(!credentials?.Email || !credentials?.passward){
                        throw new Error ("Misssing Email OR Passward")
                    }

                    try {
                        await conectedTodatabase();
                         const user = await User.findOne({Email:credentials.Email}) 
                        
                        if(!user){
                            throw new Error("No user find");
                        }

                        const IsValid = bcrypt.compare(
                            credentials.passward,
                            user.passward
                        )
                        if(!IsValid){
                            throw new Error("Invailed passward");
                        }

                        return {
                            id: user._id.toString(),
                            email:user.email
                        }
                        
                    } catch (error) {
                        console.error("Auth Error", error)
                        throw error
                        
                    }
                }
             })
  ],
  callbacks:{
    async jwt({token, user}){
        if(user){
            token.id = user.id
        }
        return token;
    },
    /*async session({token, user}){
        if(user){
            Session.user._id = token.id 
        }
        return session;
    }*/
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:30 * 24 * 60 * 60,
  },
  secret:process.env.AUTH_SECRET!

};  //login krane ke liye hai pura

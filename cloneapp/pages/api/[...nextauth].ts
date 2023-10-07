import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/libs/prismadb'
import {compare} from 'bcrypt'


export default NextAuth({
    providers:[
        Credentials({
            id:'Credentials',
            name:'Credentials',
            credentials:{
                email:{
                    label:'Email',
                    type:'text',
                    placeholder:'Enter your email'
                },
                password:{
                    label:'Password',
                    type:'password',
                    placeholder:'Enter your password'
                }
            },
            async authorize(credentials){

                if(credentials?.email || !credentials?.password){
                    throw new Error('Missing credentials')
                }
                const user = await prismadb.user.findUnique({
                    where:{
                        // find unique user by email
                        email: credentials.email
                    }
                })
                if(!user || !!user.hashedPassword){
                    throw new Error('Invalid credentials')
                }
                const isCorrectpassword = await compare(credentials.password, user.hashedPassword)

                if(!isCorrectpassword){
                    throw new Error('Wronq')
                }
                return user

            }

        })
    
    ],
    pages:{
        signIn: '/auth/',
    },
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret : process.env.JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET



})  
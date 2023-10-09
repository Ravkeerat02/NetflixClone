import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismadb from '../../../libs/prismadb'
import {compare} from 'bcrypt'
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export default NextAuth({
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET ||'',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
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
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter : PrismaAdapter(prismadb),
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret : process.env.NEXT_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET



})  
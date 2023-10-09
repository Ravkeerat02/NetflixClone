// will include register component

import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../libs/prismadb'

export default async function handler(req:NextApiRequest , res:NextApiResponse){
    if(req.method !== 'POST') {
        //405 Method Not Allowed
        return res.status(405).end() 
    }

    try{
        const{email , name , password } = req.body;

        const existingUser = await prismadb.user.findUnique({
            where: { email }
        })
        if(existingUser){
            //409 Conflict
            return res.status(422).json({ error:'Email already exists' })
        }
        
        const hashedPassword = await bcrypt.hash(password , 12)

        // store hash psswd
        const user = await prismadb.user.create({
            data:{
                email, 
                name, 
                hashedPassword, 
                image:'',
                emailVerified : new Date(),
                createdAt : new Date()
            }
        })
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(500).end()
    }
}

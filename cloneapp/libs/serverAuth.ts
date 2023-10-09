import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from './prismadb'


const serverAuth = async (req:NextApiRequest) => {
    const session = await getSession({req})

    // checking if ession exists 
    if(!session?.user?.email){
        throw new Error('Aint signed in ')
    }
    const currentUser = await prismadb.user.findUnique({
        where:{
            email: session.user.email
        }
    })
    if(!currentUser){
        throw new Error('User not found')
    }
    return {currentUser}
}
export default serverAuth
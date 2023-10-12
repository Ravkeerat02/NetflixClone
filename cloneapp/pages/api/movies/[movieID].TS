import {NextApiRequest, NextApiResponse} from 'next'
import prismadb from '../../../libs/prismadb'
import serverAuth from '../../../libs/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') return res.status(405).json({message: 'Method not allowed'})
    try{
        await serverAuth(req, res)
        // square brackets in the file name means that it is a dynamic route - considerd as a request parameter
        const {movieID} = req.query
        
        if(typeof movieID !== 'string') return res.status(400).json({message: 'Invalid movie ID'})
        if(!movieID) return res.status(400).json({message: 'Movie ID is required'})
        
        const movie = await prismadb.movie.findunique({
            where: {
                id: movieID
            },
        })
        if(!movie) return res.status(404).json({message: 'Movie not found'})

        return res.status(200).json(movie)
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Internal server error'})
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../../../libs/prismadb';
import serverAuth from "../../../libs/serverAuth";

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request method is GET
    if (req.method !== 'GET') {
      // If not, return a 405 Method Not Allowed status code
      return res.status(405).end();
    }

    // Authenticate the request using serverAuth middleware
    await serverAuth(req, res);

    // Retrieve the 'movieId' from the query parameters
    const { movieId } = req.query;

    // Validate the 'movieId' parameter
    if (typeof movieId !== 'string' || !movieId) {
      // If invalid or missing, throw an error
      throw new Error('Invalid or Missing Id');
    }

    // Query the database to find a unique movie based on the 'movieId'
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    // If movie is not found, return a 404 Not Found status code
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // If movie is found, return a 200 OK status code with the movie data in JSON format
    return res.status(200).json(movie);
  } catch (error) {
    // Handle errors by logging them and returning a 500 Internal Server Error status code
    console.error(error);
    return res.status(500).end();
  }
}

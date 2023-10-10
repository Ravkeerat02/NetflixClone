import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from '../../libs/prismadb';
import serverAuth from "../../libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request method is POST
    if (req.method === 'POST') {
      // Authenticate the user
      const { currentUser } = await serverAuth(req, res);

      // Extract movieId from the request body
      const { movieId } = req.body;
  
      // Retrieve the existing movie by its ID
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      // If the movie does not exist, throw an error
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
  
      // Update the user's favorite movie list by pushing the new movieId
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      });
  
      // Return the updated user object
      return res.status(200).json(updatedUser);
    }

    // Check if the request method is DELETE
    if (req.method === 'DELETE') {
      // Authenticate the user
      const { currentUser } = await serverAuth(req, res);

      // Extract movieId from the request body
      const { movieId } = req.body;

      // Retrieve the existing movie by its ID
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      // If the movie does not exist, throw an error
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      // Remove movieId from the user's favoriteIds list
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      // Update the user's favorite movie list with the updatedFavoriteIds
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });

      // Return the updated user object
      return res.status(200).json(updatedUser);
    }
    
    // If the request method is neither POST nor DELETE, return a 405 Method Not Allowed status
    return res.status(405).end();
  } catch (error) {
    // Log the error and return a 500 Internal Server Error status
    console.error(error);
    return res.status(500).end();
  }
}

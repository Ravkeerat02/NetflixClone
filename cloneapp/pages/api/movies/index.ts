import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end(); // Method Not Allowed
    }

    // Authenticate the request
    await serverAuth(req, res);

    // Retrieve movies from the database
    const movies = await prismadb.movie.findMany();

    // Return the movies as JSON response
    return res.status(200).json(movies);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

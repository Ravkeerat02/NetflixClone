import Navbar from 'components/Navbar';
import { NextPageContext } from 'next';
import { signOut, getSession } from 'next-auth/react';
// component
import Billboard from 'components/Billboard';
import MovieList from 'components/MovieList';
// hooks
import useCurrentUser from 'hooks/useCurrentUser';
import useMovieList from 'hooks/useMovieList';

export async function getServerSideProps(context: NextPageContext) {
  // fetching session from client
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}


export default function Home() {
  // Uused to fetch movies 
  const {data :movies = []} = useMovieList()
  return (
    <>
      <Navbar />
      <Billboard />
      <div className ="pb-40">
        <MovieList title="Trending now" data={movies} />
        
      </div>
    </>
  );
}

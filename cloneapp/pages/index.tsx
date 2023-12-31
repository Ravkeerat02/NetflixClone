// packages
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
// components
import Navbar from 'components/Navbar';
import Billboard from 'components/Billboard';
import MovieList from 'components/MovieList';
import InfoModal from 'components/InfoModal';
// hooks
import useMovieList from 'hooks/useMovieList';
import useFavorite from 'hooks/useFavorite';
import useInfoModalStore from 'hooks/useInfoModalStore';



export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorite();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}

export default Home;
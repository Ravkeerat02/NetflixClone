import Navbar from 'components/Navbar';
import useCurrentUser from 'hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { signOut, getSession } from 'next-auth/react';
import Billboard from 'components/Billboard';
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
  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}

import useCurrentUser from 'hooks/useCurrentUser';
import { NextPageContext } from 'next';
import { signOut, getSession } from 'next-auth/react';

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
  const {data : user} = useCurrentUser()
  return (
    <>
      <h1 className="text-2xl text-red-500">NetFlix Clone </h1>
      <p className='text-white'>Logged in as :{user?.name}</p>
      <button onClick={() => signOut()} 
      className='h-10 w-full bg-white'>
        Logout
      </button>
    </>
  );
}

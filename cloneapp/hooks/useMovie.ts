import useSwr from 'swr';
import fetcher from '../libs/fetcher';

const useMovie = (id?: string) => {
  const { data, error, isValidating } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const isLoading = !data && isValidating;
  const isError = error !== undefined;

  console.log('Data:', data);
  console.log('Error:', error);
  console.log('Is Loading:', isLoading);
  console.log('Has Error:', isError);

  return {
    data,
    error,
    isLoading,
    isError,
  };
};

export default useMovie;

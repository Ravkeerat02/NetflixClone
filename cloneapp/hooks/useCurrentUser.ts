import useSwr from 'swr';
import fetcher from 'libs/fetcher';
import exp from 'constants';

const useCurrentUser = () => {
    // used for fetching data - wont fetch data if it already exists
    const { data, error , isLoading , mutate } = useSwr('/api/current', fetcher);

    return {
        data,
        error, 
        isLoading, 
        mutate
    };
}

export default useCurrentUser
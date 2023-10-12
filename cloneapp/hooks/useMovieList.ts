import useSwr from 'swr'
import fetcher from 'libs/fetcher'

const useMovie = () => {
    const{data , error , isLoading } = useSwr('/api/movies',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    })
    return {
        data,
        error , 
        isLoading

    }
    
}

export default useMovie
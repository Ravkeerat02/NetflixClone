import axios from "axios";

// will be used to fetch the url
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher
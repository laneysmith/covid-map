import { ResponseData } from '../types';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : 'http://localhost:5000';

const fetchData = async (): Promise<ResponseData> => fetch(`${API_URL}/covid`)
  .then((response) => response.json())
  .then((data) => data)
  .catch((e) => {
    console.log(e);
  });

export default fetchData;

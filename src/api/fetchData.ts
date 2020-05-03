const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : 'http://localhost:5000';

const fetchData = async (): Promise<any> => fetch(`${API_URL}/covid`)

export default fetchData;

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : 'http://localhost:5000';

const fetchData = async () => {
  return fetch(`${API_URL}/covid`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default fetchData;

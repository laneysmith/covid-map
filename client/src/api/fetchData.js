const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://sleepy-escarpment-81369.herokuapp.com'
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

const BASE_URL = 'http://localhost:5000'
function getData (querystring) {
  const getUrl = BASE_URL + querystring
  return fetch(getUrl, {
  }).then(response => response.json()).then((response) => response).catch((error) => error)
}

export default getData

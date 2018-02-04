import _ from 'lodash';

async function get(path, query) {
  let url = path;
  if (query) {
    url += `?`;
    _.forOwn(query, (value, key) => {
      url += `${key}=value&`
    });
  }

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
      })
      .then((blob) => {
        return resolve(blob);
      })
      .catch((err) => {
        return reject(err);
      })

  });
}

async function post(path, body, query) {
  let url = path;
  if (query) {
    url += `?`;
    _.forOwn(query, (value, key) => {
      url += `${key}=value&`
    });
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        return resolve(json);
      })
      .catch((err) => {
        return reject(err);
      })
  });
}


export default {get, post};
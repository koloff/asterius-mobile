import firebase from 'react-native-firebase';

function watch(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('value', callback);
  return ref;
}

function childAdded(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_added', callback);
  return ref;
}

function childRemoved(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_removed\t', callback);
  return ref;
}

function childChanged(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_changed', callback);
  return ref;
}

async function get(path) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(path).once('value', (snapshot) => {
      const data = snapshot.val();
      return resolve(data);
    }, (err) => {
      return reject(err);
    });
  });
}

async function save(path, data) {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(JSON.stringify(data));
    firebase.database().ref(path).set(parsedData)
      .then((success) => {
        return resolve(success);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  })
}

async function push(path, data) {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(JSON.stringify(data));
    firebase.database().ref(path).push(parsedData)
      .then((success) => {
        return resolve(success);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });
  })
}

export default {get, save, push, watch, childAdded, childChanged, childRemoved};
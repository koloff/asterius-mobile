import firebase from 'react-native-firebase';

function watch(path, callback, error) {
  const ref = firebase.database().ref(path);
  ref.on('value', callback, error);
  return ref;
}

function childAdded(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_added', callback);
  return ref;
}

function childRemoved(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_removed', callback);
  return ref;
}

function childChanged(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_changed', callback);
  return ref;
}

async function get(path) {
  return new Promise((resolve, reject) => {
    // console.log('downloading', path);
    firebase.database().ref(path).once('value', (snapshot) => {
      const data = snapshot.val();
      // console.log('downloaded', path);
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

async function remove(path) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(path).remove()
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

    const ref = firebase.database().ref(path).push();
    let resPath = ref.path;
    let resKey = ref.key;
    ref.set(parsedData, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({path: resPath, key: resKey});
      }
    })

  })
}

export default {get, save, push, remove, watch, childAdded, childChanged, childRemoved};
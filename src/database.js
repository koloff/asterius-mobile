import firebase from 'react-native-firebase';
import connectionStore from './store/connectionStore';


function watch(path, callback, error) {
  const ref = firebase.database().ref(path);
  ref.on('value', callback, error);
  ref.keepSynced(true);
  return ref;
}

function childAdded(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_added', callback);
  ref.keepSynced(true);
  return ref;
}

function childRemoved(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_removed', callback);
  ref.keepSynced(true);
  return ref;
}

function childChanged(path, callback) {
  const ref = firebase.database().ref(path);
  ref.on('child_changed', callback);
  ref.keepSynced(true);
  return ref;
}

async function get(path) {
  return new Promise(async (resolve, reject) => {
    let ref = firebase.database().ref(path);

    ref.once('value', (snapshot) => {
      const data = snapshot.val();
      return resolve(data);
    }, (err) => {
      return reject(err);
    });

    ref.keepSynced(true);

    setTimeout(async () => {
      if (!connectionStore.connected) {
        console.log('not synceeed');
        return resolve(null);
      }
    }, 100);

  });
}

async function save(path, data) {
  return new Promise((resolve, reject) => {
    const parsedData = JSON.parse(JSON.stringify(data));
    let ref = firebase.database().ref(path);
    ref.set(parsedData)
      .then((success) => {
        return resolve(success);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });

    ref.keepSynced(true);

    if (!connectionStore.connected) {
      return resolve();
    }
  })
}

async function remove(path) {
  return new Promise((resolve, reject) => {
    let ref = firebase.database().ref(path);
    ref.remove()
      .then((success) => {
        return resolve(success);
      })
      .catch((err) => {
        console.log(err);
        return reject(err);
      });

    ref.keepSynced(true);

    if (!connectionStore.connected) {
      return resolve();
    }
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
    });

    ref.keepSynced(true);

    if (!connectionStore.connected) {
      return resolve({path: resPath, key: resKey});
    }
  })
}

export default {get, save, push, remove, watch, childAdded, childChanged, childRemoved};
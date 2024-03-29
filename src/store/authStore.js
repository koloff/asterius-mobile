import {computed, action, observable, extendObservable} from 'mobx';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

class AuthStore {
  @observable newUser = false;

  constructor() {
    this.reset();
  }

  @action reset() {
    extendObservable(this, {
      isAnonymous: null,
      uid: '',
      idToken: ''
    });
  }

  @computed get logged() {
    return this.uid && this.isAnonymous === false;
  }

  async loginAnonymously() {
    return new Promise((resolve, reject) => {
      firebase.auth().signInAnonymouslyAndRetrieveData().catch(function(error) {
        if (error) {
          console.log(error);
          let errorCode = error.code;
          return reject(errorCode);
        }

        return resolve(true);
      });
    })
  }

  async init() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          this.uid = user.uid;

          if (user.isAnonymous) {
            this.isAnonymous = true;
            return resolve(true);
          }
          else {
            user.getIdToken(false)
              .then((idToken) => {
                this.isAnonymous = false;
                this.idToken = idToken;
                return resolve(true);
              }).catch((error) => {
              console.log(error);
              return reject(false);
            });
          }
        } else {
          return resolve();
        }
      });
    })
  }

  async register(email, password) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        return reject({message: 'Provide email and password!'});
      }
      let credential = firebase.auth.EmailAuthProvider.credential(email, password);
      firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(async (user) => {
        console.log("Anonymous account successfully upgraded", user);
        // link does not trigger onAuthStateChanged
        this.newUser = true;
        await this.init();
        return resolve(user);
      }, function(error) {
        console.log("Error upgrading anonymous account", error);
        return reject(error);
      });
    });
  }

  async registerWithFacebook() {
    return new Promise(async (resolve, reject) => {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw {show: false, message: 'You cancelled the login!'};
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw {message: 'An error occurred!'};
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      firebase.auth().currentUser.linkAndRetrieveDataWithCredential(credential).then(async (user) => {
        console.log("Anonymous account successfully upgraded", user);
        // link does not trigger onAuthStateChanged
        this.newUser = true;
        await this.init();
        return resolve(user);
      }, function(error) {
        console.log("Error upgrading anonymous account", error);
        return reject({show: true, message: 'This account is already registered! You can login with it.'});
      });
    })
  }


  async loginWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        return reject({message: 'Provide email and password!'});
      }
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((user) => {
          return resolve(user);
        })
        .catch((error) => {
          console.log(error);
          return reject(error);
        });
    });
  }


  async loginWithFacebook() {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw {show: false, message: 'You cancelled the login!'};
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw {message: 'An error occurred!'};
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
  }


  async logout() {
    return new Promise((resolve) => {
      firebase.auth().signOut().then(() => {
        this.reset();
        return resolve();
      });
    })
  }

}

export default new AuthStore();
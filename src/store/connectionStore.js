import {observable} from 'mobx';
import {NetInfo} from 'react-native';

class ConnectionStore {
  @observable connected = false;

  async init() {
    return new Promise((resolve, reject) => {
      NetInfo.addEventListener('connectionChange', (connectionInfo) => {
        this.connected = connectionInfo.type !== 'none';
        return resolve();
      })
    })
  }
}

export default new ConnectionStore();
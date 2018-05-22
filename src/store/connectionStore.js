import {observable} from 'mobx';
import {NetInfo} from 'react-native';

class ConnectionStore {
  @observable connected = true;

  init() {
    NetInfo.addEventListener('connectionChange', (connectionInfo) => {
      this.connected = connectionInfo.type !== 'none';
    })
  }
}

export default new ConnectionStore();
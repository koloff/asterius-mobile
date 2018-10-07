import {observable} from 'mobx';
import {Dimensions, Platform} from 'react-native';

class DeviceStore {
  @observable width;
  @observable height;
  @observable platform;

  init() {
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;
    this.platform = Platform.OS;
    console.log(this.width, this.height);
  }
}

export default new DeviceStore();
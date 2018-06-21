import {computed, action, observable, extendObservable} from 'mobx';
import {AsyncStorage} from 'react-native';
import * as tips from '../components/tips/tips';


class TipsStore {
  tips = tips;

  @observable firstLoad = true;
  @observable currentTips = this.tips.start;
  @observable modalOpened = false;
  @observable isRinging = false;

  openTipsModal() {
    this.modalOpened = true;
  }


  closeTipsModal() {
    this.modalOpened = false;
  }

  async setTips(tips) {
    const ringed = await AsyncStorage.getItem(tips.id);
    if (ringed === null) {
      this.startRinging();
    } else {
      this.isRinging = false;
    }

    this.currentTips = tips
  }

  // CALL THIS METHOD AT LEAST ONCE
  // TO SHOW THE BALL
  startRinging() {
    this.isRinging = true;
  }

  async stopRinging(id) {
    await AsyncStorage.setItem(id, '1');
    this.isRinging = false;
  }
}

export default new TipsStore();


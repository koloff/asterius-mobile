import {computed, action, observable, extendObservable} from 'mobx';
import * as tips from '../components/tips/tips';



class TipsStore {

  tips = {
    demo: {
      count: 35,
      component: tips.Demo
    },
    demo2: {
      count: 1,
      component: tips.Demo2
    }
  };

  @observable currentTips = this.tips.demo;
  @observable modalOpened = false;
  @observable isRinging = false;

  openTipsModal() {
    this.modalOpened = true;
  }


  closeTipsModal() {
    this.modalOpened = false;
  }

  setTips(tips) {
    this.currentTips = tips
  }

  // CALL THIS METHOD AT LEAST ONECE
  // TO SHOW THE BALL
  startRinging() {
    console.log('start ringing');
    this.isRinging = true;
  }

  stopRinging() {
    this.isRinging = false;
  }

  shortRing() {

  }
}

export default new TipsStore();


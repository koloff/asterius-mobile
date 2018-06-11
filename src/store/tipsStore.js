import {computed, action, observable, extendObservable} from 'mobx';
import * as tips from '../components/tips/tips';



class TipsStore {

  tips = {
    demo: {
      count: 3,
      component: tips.Demo
    },
    demo2: {
      count: 1,
      component: tips.Demo2
    }
  };

  @observable currentTips = this.tips.demo;
  @observable modalOpened = false;

  openTipsModal() {
    this.modalOpened = true;
  }


  closeTipsModal() {
    this.modalOpened = false;
  }

  setTips(tips) {
    this.currentTips = tips
  }
}

export default new TipsStore();


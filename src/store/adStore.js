import firebase from 'react-native-firebase';
import {observable} from 'mobx';

class AdStore {

  @observable lastAdSeconds = 0;


  /**
   * use with .show()
   * @returns {Promise<Promise<any> | Promise>}
   */
  async getAd() {
    return new Promise((resolve, reject) => {
      const advert = firebase.admob().interstitial('ca-app-pub-3940256099942544/4411468910');
      const request = new firebase.admob.AdRequest();
      // request.addKeyword('foo').addKeyword('bar');

      // Load the advert with our AdRequest
      advert.loadAd(request.build());

      advert.on('onAdLoaded', () => {
        return resolve(advert);
      });
    })
  }
}

export default new AdStore();


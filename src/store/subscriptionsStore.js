import {observable} from 'mobx';
import {Platform} from 'react-native'
import * as RNIap from 'react-native-iap';
import firebase from 'react-native-firebase';

const httpsCallable = firebase.functions().httpsCallable('myFooBarFn');


class SubscriptionStore {
  @observable isSubscribed;
  @observable currencySymbol;
  @observable monthlyPrice = '';
  @observable yearlyPrice = '';


  async init() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isSubscribed = true;
        return resolve();
      }, 200)
    })
  }

  async getPrices() {
    return new Promise(async (resolve, reject) => {
      const PURCHASE_ITEMS = Platform.select({
        ios: [
          '0001',
          '0002',
        ],
        android: [
          'productid_1',
          'productid_2',
        ],
      });

      try {
        await RNIap.prepare();
        const products = await RNIap.getProducts(PURCHASE_ITEMS);
        console.log(products);

        this.monthlyPrice = products[0].price;
        this.yearlyPrice = products[1].price;
        this.currencySymbol = products[0].currency;

        return resolve(true);

      } catch (err) {
        console.log(err); // standardized err.code and err.message available
      }

    })
  }


  async subscribe(period) {
    return RNIap.buyProduct('0001')
      .then((purchase) => {
        console.log(purchase);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  callCloudFunction() {
    httpsCallable({ some: 'args' })
      .then(({ data }) => {
        console.log(data); // hello world
      })
      .catch(httpsError => {
        console.log(httpsError.code); // invalid-argument
        console.log(httpsError.message); // Your error message goes here
        console.log(httpsError.details); // bar
      })
  }


}

export default new SubscriptionStore();
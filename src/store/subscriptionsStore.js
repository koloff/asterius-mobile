import {observable} from 'mobx';
import {NativeModules, Platform} from 'react-native'

const {InAppUtils} = NativeModules;

class SubscriptionStore {
  @observable isSubscribed;
  @observable currencySymbol;
  @observable monthlyPrice = '';
  @observable yearlyPrice = '';


  async init() {
    this.isSubscribed = false;
  }

  async getPrices() {
    return new Promise((resolve, reject) => {
      let products = [
        '0001', '0002'
      ];
      InAppUtils.loadProducts(products, (error, products) => {
        if (error) {
          return reject(error);
        }

        this.currencySymbol = products[0].currencySymbol;
        this.monthlyPrice = products[0].price;
        this.yearlyPrice = products[1].price;

        return resolve(true);
      });
    })
  }


  async subscribeIOs(period) {
    InAppUtils.canMakePayments((canMakePayments) => {
      if (!canMakePayments) {
        Alert.alert('Not Allowed', 'This device is not allowed to make purchases. Please check restrictions on device');
      } else {

        if (period === 'month') {
          InAppUtils.purchaseProduct('0001', (error, response) => {
            // NOTE for v3.0: User can cancel the payment which will be available as error object here.
            console.log(error);
            console.log(response);
            if(response && response.productIdentifier) {
              Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
              //unlock store here.
              // todo
            }
          });
        }
        
      }
    })
  }

  async subscribe(period) {
    if (Platform.OS === 'ios') {
      return this.subscribeIOs(period);
    } else {
      // todo android
    }
  }



}

export default new SubscriptionStore();
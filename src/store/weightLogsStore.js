import {autorun, computed, observable} from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import database from "../database";
import authStore from "./authStore";
import firebase from 'react-native-firebase';

class WeightLogsStore {
  path;
  @observable period = 7;
  @observable logs = [];

  init() {
    this.path = `weightLogs/${authStore.uid}`;
    this.loadLogs(this.period);
  }

  loadLogs(days) {
    this.period = days;
    this.logs.replace([]);
    let timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - days);
    let ref = firebase.database().ref(this.path);
    ref.keepSynced(true);
    ref.off('child_added');
    ref
      .orderByChild('time')
      .startAt(timestamp.getTime())
      .on('child_added', (ref) => {
        let log = {...ref.val(), key: ref.key};
        this.logs.unshift(log);
      });
  }

  @computed get logsData() {
    let min = 999, max = 0;
    this.logs.forEach((log) => {
      if (log.weight < min) {
        min = log.weight;
      }
      if (log.weight > max) {
        max = log.weight;
      }
    });

    return {min, max};
  }

  @computed
  get logsLength() {
    return this.logs.length;
  }

  @computed
  get graphData() {
    if (this.logs.length === 0) {
      return [1, 1];
    } else if (this.logs.length === 1) {
      return [this.logs[0].weight, this.logs[0].weight]
    }
    let res = [];
    _.forEachRight(this.logs, (log) => {
      res.push(log.weight);
    });
    return res;
  }


  removeLog(key) {
    let logIndex = this.logs.findIndex((log) => log.key === key);
    database.remove(`${this.path}/${key}`);
    this.logs.splice(logIndex, 1);
  }

  addLog(weight) {
    if (isNaN(weight) || weight < 30 || weight > 300) {
      return;
    }
    database.save(`userParameters/${authStore.uid}/weight`, parseFloat(weight));
    database.push(this.path, {
      time: Date.now(),
      weight: parseFloat(weight)
    })
  }


}


export default new WeightLogsStore();
import {autorun, computed, observable} from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import database from "../database";
import authStore from "./authStore";


class WeightLogsStore {
  path;
  @observable logs = [];

  init() {
    this.path = `weightLogs/${authStore.uid}`;

    database.childAdded(this.path, (ref) => {
      let log = {...ref.val(), key: ref.key};
      this.logs.push(log);
    })
  }


  //todo create period
  loadLogs() {

  }

  @computed get graphData() {
    if (this.logs.length === 0) {
      return [1, 1];
    } else if (this.logs.length === 1) {
      return [this.logs[0].weight, this.logs[0].weight]
    }
    return this.logs.map((log) => log.weight);
  }

  addLog(weight) {
    database.push(this.path, {
      time: Date.now(),
      weight: parseFloat(weight)
    })
  }


}


export default new WeightLogsStore();
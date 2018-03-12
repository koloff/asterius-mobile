import {autorun, computed, observable} from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import database from "../database";
import authStore from "./authStore";


class WeightLogsStore {
  path;
  @observable period = '1W';
  @observable logs = [];

  init() {
    this.path = `weightLogs/${authStore.uid}`;

    database.childAdded(this.path, (ref) => {
      let log = {...ref.val(), key: ref.key};
      this.logs.unshift(log);
    })
  }

  loadLogs() {

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
    database.save(`/userParameters/${authStore.uid}/weight`, parseFloat(weight));
    database.push(this.path, {
      time: Date.now(),
      weight: parseFloat(weight)
    })
  }


}


export default new WeightLogsStore();
import {observable, autorun} from 'mobx';
import database from '../database';
import authStore from './authStore';
import {extendObservable} from "mobx";
import calculateFitnessLevel from '../algorithm/calculate-fitness-level';
import _ from 'lodash';

class UserParametersStore {
  @observable path;
  @observable parameters;

  reset() {
    extendObservable(this, {
      parameters: {
        gender: null, // 1 - male, 2 - female
        measuringUnit: 1, // 1 - metric, 2 - imperial
        age: '',
        weight: '',
        height: '',
        experience: 2, // 1-4
        days: 2, // 1-3 (1/2, 3/4, 5/6)
        duration: 70, // minutes
        preferredMuscles: [],
        activity: 3,
        goal: 3, // 1-5 (1-loose fat, 5 - gain weight)
        fitnessLevel: null
      }
    });
  }

  constructor() {
    this.reset();
  }

  async init() {
    return new Promise((resolve, reject) => {

      autorun(() => {
        this.path = `/userParameters/${authStore.uid}`;
        this.reset();
        database.watch(this.path, (snap) => {
          let userParameters = snap.val();
          if (userParameters) {
            if (!userParameters.preferredMuscles) userParameters.preferredMuscles = [];
            this.parameters = userParameters;
          }
          return resolve();
        })
      })

    });
  }

  switchMuscle(id) {
    if (this.parameters.preferredMuscles.indexOf(id) === -1) {
      this.parameters.preferredMuscles.push(id);
    } else {
      let index = this.parameters.preferredMuscles.indexOf(id);
      if (index >= 0) {
        this.parameters.preferredMuscles.splice(index, 1);
      }
    }
  }

  // on slider drag
  setParameterImmediate(parameter, value) {
    this.parameters[parameter] = value;
  }

  // on slider release
  setParameterFinish(parameter, value) {
    database.save(`${this.path}/${parameter}`, value);
  }

  async saveUserParameters() {
    this.parameters.fitnessLevel = calculateFitnessLevel(this.parameters);
    await database.save(this.path, this.parameters);
  }

}

export default new UserParametersStore();
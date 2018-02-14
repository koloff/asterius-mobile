import {computed, observable} from 'mobx';
import _ from 'lodash';
import database from '../database';
import authStore from './authStore';
import WorkoutTemplateStore from './WorkoutTemplateStore';

export default class WorkoutsTemplatesStore {
  @observable path;
  @observable workouts = [];

  constructor() {
    //todo
    this.path = `/workoutsTemplates/${authStore.uid}`;
  }

  listenChildAdded() {
    database.childAdded(this.path, (snap) => {
      console.log(snap.key);
      console.log(this.path + snap.key);
      let workout = {
        workout: new WorkoutTemplateStore(snap.val(), snap.key, this.path + '/' + snap.key),
        key: snap.key
      };
      this.workouts.unshift(workout);
    });
  }

  listenChildRemoved() {
    database.childRemoved(this.path, (snap) => {
      let index = this.workouts.findIndex((item) => item.key === snap.key);
      this.workouts.splice(index, 1);
    })
  }

  async addWorkout() {
    try {
      let {key, path} = await database.push(this.path, {name: 'Custom workout'});
    } catch (err) {
      console.log(err);
    }
  }
}
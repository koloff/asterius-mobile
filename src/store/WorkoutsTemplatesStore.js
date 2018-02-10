import {computed, observable} from 'mobx';
import _ from 'lodash';
import database from '../database';
import authStore from './authStore';
import WorkoutTemplateStore from './WorkoutTemplateStore';

export default class WorkoutsTemplatesStore {
  @observable path;
  @observable workouts = [];

  constructor() {
    this.path = `/workoutsTemplates/${authStore.uid}`;

    database.childAdded(this.path, (snap) => {
      let workout = {workout: new WorkoutTemplateStore(snap.val()), key: snap.key};
      this.workouts.unshift(workout);
    });

    database.childRemoved(this.path, (snap) => {
      let index = this.workouts.findIndex((item) => item.key === snap.key);
      this.workouts.splice(index, 1);
    })
  }
}
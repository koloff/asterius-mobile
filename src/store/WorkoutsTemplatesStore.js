import {computed, observable} from 'mobx';
import _ from 'lodash';
import database from '../database';
import authStore from './authStore';
import WorkoutTemplateStore from './WorkoutTemplateStore';
import {ListView} from "react-native";

export default class WorkoutsTemplatesStore {

  @observable path;
  @observable workouts = [];

  constructor() {
    this.path = `/workoutsTemplates/${authStore.uid}`;

    database.get(this.path).then((data) => {
      _.forOwnRight(data, (workout) => {
        console.log(workout);
        this.workouts.push(new WorkoutTemplateStore(workout));
      })
    });
    // database.childAdded(this.path, (snap) => {
    //   console.log(snap.val());
    //   this.workouts.unshift(new WorkoutTemplateStore(snap.val()));
    // })
  }

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  @computed get dataSource() {
    return this.ds.cloneWithRows(this.workouts.slice());
  }

}
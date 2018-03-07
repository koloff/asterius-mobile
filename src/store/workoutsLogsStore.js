import {autorun, computed, observable} from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import database from "../database";
import authStore from "./authStore";
import WorkoutTemplateStore from "./WorkoutTemplateStore";
import exercisesLogsStore from './exercisesLogsStore';

const dotColor = 'rgba(255,143,0 ,1)';

class WorkoutsLogsStore {
  path;
  @observable todayDateStr;
  @observable pressedDateStr;
  @observable workoutsLogs = new Map();
  @observable workoutLogsStores = new Map();

  async init() {
    this.path = `workoutsLogs/${authStore.uid}`;
    this.todayDateStr = moment().format('YYYY-MM-DD');
    let workouts = await database.get(this.path);
    _.forOwnRight(workouts, (workout, dateStr) => {
      this.workoutsLogs.set(dateStr, workout);
    });
  }

  @computed get selectedDateStr() {
    if (this.pressedDateStr && !this.workoutsLogs.has(this.pressedDateStr)) {
      return this.pressedDateStr;
    }
    if (!this.workoutsLogs.has(this.todayDateStr)) {
      return this.todayDateStr;
    }
    return null;
  }

  @computed get calendarData() {
    let res = {};
    this.workoutsLogs.forEach((workout, dateStr) => {
      res[dateStr] = {marked: true, dotColor: dotColor}
    });
    if (this.selectedDateStr) {
      res[this.selectedDateStr] = {marked: false, selected: true};
    }
    return res;
  }


  async startNewWorkoutLog(dateStr, workoutTemplateStore) {
    workoutTemplateStore.addPerformedDate(dateStr);
    await database.save(`${this.path}/${dateStr}`,
      // set the new workoutStore in db
      {
        workoutTemplate: workoutTemplateStore.asObject
      });
    // todo check
    this.workoutsLogs.set(dateStr, workoutTemplateStore.asObject);
  }

  @observable _currentWorkoutDateStrings = [];

  @computed get currentWorkoutDateStr() {
    if (!this._currentWorkoutDateStrings.length) {
      return null;
    }
    return this._currentWorkoutDateStrings[this._currentWorkoutDateStrings.length - 1];
  }

  subtractOpenedWorkout() {
    this._currentWorkoutDateStrings.splice(
      this._currentWorkoutDateStrings.length - 1, 1);
  }


  async addNewWorkoutLogStore(dateStr) {
    let workoutLogStore = new WorkoutLogStore();
    await workoutLogStore.init(this, dateStr);
    this.workoutLogsStores.set(dateStr, workoutLogStore);
    this._currentWorkoutDateStrings.push(dateStr);
    return this.workoutLogsStores.get(dateStr);
  }

  getWorkoutLogStore(dateStr) {
    return this.workoutLogsStores.get(dateStr);
  }
}

class WorkoutLogStore {
  workoutsLogsStore;
  workoutTemplateStore;
  path;
  dateStr;

  async init(workoutsLogsStore, workoutLogDateStr) {
    this.workoutsLogsStore = workoutsLogsStore;
    this.path = `workoutsLogs/${authStore.uid}/${workoutLogDateStr}`;
    this.dateStr = workoutLogDateStr;
    try {
      let workoutTemplatePath = `${this.path}/workoutTemplate`;
      let workoutTemplate = await database.get(workoutTemplatePath);
      this.workoutTemplateStore = new WorkoutTemplateStore(workoutTemplate, workoutTemplatePath);
    } catch (err) {
      console.log(err);
    }
  }

  remove() {
    this.workoutTemplateStore.exercises.forEach((exercise) => {
      exercisesLogsStore
        .getExerciseLogs(exercise.id)
        .getLog(this.dateStr)
        .remove();
    });

    this.workoutsLogsStore.workoutsLogs.delete(this.dateStr);
    database.remove(this.path);
  }


}


export default new WorkoutsLogsStore();
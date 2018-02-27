import {autorun, computed, observable} from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import database from "../database";
import authStore from "./authStore";
import WorkoutTemplateStore from "./WorkoutTemplateStore";
import exercisesLogsStore from "./exercisesLogsStore";

const dotColor = 'rgba(255,143,0 ,1)';

class WorkoutsLogsStore {
  path;
  @observable todayDateStr;
  @observable pressedDateStr;
  @observable previousWorkoutLogs = new Map();

  async init() {
    this.path = `workoutsLogs/${authStore.uid}`;
    this.todayDateStr = moment().format('YYYY-MM-DD');
    let workouts = await database.get(this.path);
    _.forOwnRight(workouts, (workout, key) => {
      this.previousWorkoutLogs.set(key, workout);
    });
  }

  @computed get selectedDateStr() {
    if (this.pressedDateStr && !this.previousWorkoutLogs.has(this.pressedDateStr)) {
      return this.pressedDateStr;
    }
    if (!this.previousWorkoutLogs.has(this.todayDateStr)) {
      return this.todayDateStr;
    }
    return null;
  }

  @computed get calendarData() {
    let res = {};
    this.previousWorkoutLogs.forEach((workout, dateStr) => {
      res[dateStr] = {marked: true, dotColor: dotColor}
    });
    if (this.selectedDateStr) {
      res[this.selectedDateStr] = {marked: false, selected: true};
    }
    return res;
  }

  async startNewWorkoutLog(dateStr, workoutTemplateStore) {
    if (!workoutTemplateStore.lastPerformed ||
      dateStr > workoutTemplateStore.lastPerformed) {
      workoutTemplateStore.updateLastPerformed(dateStr);
    }
    await database.save(`${this.path}/${dateStr}`,
      // set the new workoutStore in db
      {
        workoutTemplate: workoutTemplateStore.asObject
      });
    // todo check
    this.previousWorkoutLogs.set(dateStr, workoutTemplateStore.asObject);
    this.addCurrentWorkoutLog(dateStr);
  }

  // due to lack of navigation events cannot keep track of which
  // is the current workoutStore log on screen todo change
  @observable _openedWorkoutsLogs = [];
  @observable currentWorkoutLog;

  async addCurrentWorkoutLog(dateStr) {
    let workoutLogStore = new WorkoutLogStore();
    // async
    await workoutLogStore.init(dateStr);
    this._openedWorkoutsLogs.push(workoutLogStore);
    this.currentWorkoutLog = workoutLogStore;
  }

  subtractCurrentWorkoutLog() {
    this._openedWorkoutsLogs.pop();
    this.currentWorkoutLog = this._openedWorkoutsLogs[this._openedWorkoutsLogs.length - 1];
  }
}

class WorkoutLogStore {
  workoutTemplateStore;
  path;
  dateStr;

  async init(workoutLogDateStr) {
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
    // todo
    // remove logs for each exercise
  }
}


export default new WorkoutsLogsStore();
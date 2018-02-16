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
  @observable selectedDateStr;
  // todo from db
  @observable previousWorkoutLogs = {
    '2018-01-29': {
      workoutTemplate: {
        name: 'Workout A',
        exercises: [
          {id: 'reversePecDeck', sets: 3},
          {id: 'highCableCrossover', sets: 3},
          {id: 'ropePushdown', sets: 77},
          {id: 'dumbbellShoulderPress', sets: 4},
          {id: 'lowCableCrossover', sets: 3},
          {id: 'dumbbellInclineBenchPress', sets: 4},
          {id: 'seatedTricepsPress', sets: 3}
        ]
      }
    },
    '2018-01-31': {
      workoutTemplate: {
        name: 'Workout A',
        exercises: [
          {id: 'reversePecDeck', sets: 3},
          {id: 'highCableCrossover', sets: 3},
          {id: 'ropePushdown', sets: 77},
          {id: 'dumbbellShoulderPress', sets: 4},
          {id: 'lowCableCrossover', sets: 3},
          {id: 'dumbbellInclineBenchPress', sets: 4},
          {id: 'seatedTricepsPress', sets: 3}
        ]
      }
    },
    '2017-11-02': {
      workoutTemplate: {
        name: 'Workout A',
        exercises: [
          {id: 'reversePecDeck', sets: 3},
          {id: 'highCableCrossover', sets: 3},
          {id: 'ropePushdown', sets: 77},
          {id: 'dumbbellShoulderPress', sets: 4},
          {id: 'lowCableCrossover', sets: 3},
          {id: 'dumbbellInclineBenchPress', sets: 4},
          {id: 'seatedTricepsPress', sets: 3}
        ]
      }
    },
    '2018-02-10': {
      workoutTemplate: {
        name: 'Workout A',
        exercises: [
          {id: 'reversePecDeck', sets: 3},
          {id: 'highCableCrossover', sets: 3},
          {id: 'ropePushdown', sets: 77},
          {id: 'dumbbellShoulderPress', sets: 4},
          {id: 'lowCableCrossover', sets: 3},
          {id: 'dumbbellInclineBenchPress', sets: 4},
          {id: 'seatedTricepsPress', sets: 3}
        ]
      }
    },
  };

  //
  async init() {
    this.path = `workoutsLogs/${authStore.uid}`;
    this.todayDateStr = moment().format('YYYY-MM-DD');
    this.selectedDateStr = this.todayDateStr;
    // this.previousWorkoutLogs = await database.get(this.path);
  }

  async startNewWorkoutLog(dateStr, workoutTemplate) {
    await database.save(`${this.path}/${dateStr}`, {
      workoutTemplate: workoutTemplate
    });
    await this.addCurrentWorkoutLog(dateStr);
  }

  // due to lack of navigation events cannot keep track of which
  // is the current workout log on screen todo change
  @observable _openedWorkoutsLogs = [];

  async addCurrentWorkoutLog(dateStr) {
    let workoutLogStore = new WorkoutLogStore();
    // async
    await workoutLogStore.init(dateStr);
    console.log(workoutLogStore);
    this._openedWorkoutsLogs.push(workoutLogStore);
  }


  removeCurrentWorkoutLog() {
    this._openedWorkoutsLogs.pop();
  }

  @computed get currentWorkoutLog() {
    if (!this._openedWorkoutsLogs.length) {
      return null;
    }
    return this._openedWorkoutsLogs[this._openedWorkoutsLogs.length - 1];
  }


  //////////////////////////////////


  @computed get calendarData() {
    let res = {};
    _.forOwn(this.previousWorkoutLogs, (workout, dateStr) => {
      res[dateStr] = {marked: true, dotColor: dotColor}
    });
    res[this.selectedDateStr] = {marked: false, selected: true};
    return res;
  }
}

class WorkoutLogStore {
  workoutTemplateStore;
  path;

  async init(workoutLogDateStr) {
    this.path = `workoutsLogs/${authStore.uid}/${workoutLogDateStr}`;
    try {
      let workoutTemplatePath = `${this.path}/workoutTemplate`;
      let workoutTemplate = await database.get(workoutTemplatePath);
      this.workoutTemplateStore = new WorkoutTemplateStore(workoutTemplate, workoutTemplatePath);
    } catch (err) {
      console.log(err);
    }
  }

  // todo for each exercise in template get ex store
  @computed get exercisesLogs() {
    // console.log(this.workoutTemplateStore.exercises);
    // return 1;
    return this.workoutTemplateStore.exercises.map((workoutTemplateExerciseStore) => exercisesLogsStore.getExerciseLogs(workoutTemplateExerciseStore.id));
  }
}


export default new WorkoutsLogsStore();
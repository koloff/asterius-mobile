import {autorun, computed, observable} from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import database from "../database";
import authStore from "./authStore";
import WorkoutTemplateStore from "./WorkoutTemplateStore";
import exercisesLogsStore from "./exercisesLogsStore";

const dotColor = 'rgba(255,143,0 ,1)';


// module.hot.accept(() => { });

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

  @computed get calendarData() {
    let res = {};
    _.forOwn(this.previousWorkoutLogs, (workout, dateStr) => {
      res[dateStr] = {marked: true, dotColor: dotColor}
    });
    res[this.selectedDateStr] = {marked: false, selected: true};
    return res;
  }

  async startNewWorkoutLog(dateStr, workoutTemplate) {
    await database.save(`${this.path}/${dateStr}`,
      // set the new workout in db
      {
        workoutTemplate: workoutTemplate
      });
    await this.addCurrentWorkoutLog(dateStr);
  }

  // due to lack of navigation events cannot keep track of which
  // is the current workout log on screen todo change
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
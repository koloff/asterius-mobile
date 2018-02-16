import {observable, computed, extendObservable} from 'mobx';
import authStore from "./authStore";
import database from "../database";
import workoutsLogsStore from './workoutsLogsStore';


class ExercisesLogsStore {
  path;
  @observable exercisesLogs = new Map();

  init() {
    this.path = `exercisesLogs/${authStore.uid}`;
    extendObservable(this, {
      exercisesLogs: new Map()
    });
  }

  getExerciseLogs(id) {
    if (!this.exercisesLogs.get(id)) {
      let exerciseLogsStore = new ExerciseLogsStore(id);
      this.exercisesLogs.set(id, exerciseLogsStore);
    }
  }
}


class ExerciseLogsStore {
  id;
  path;
  @observable exerciseLogs = new Map();
  @observable lastPerformedDateStr;

  constructor(id) {
    this.id = id;
    this.path = `exercisesLogs/${authStore.uid}/${id}`;
  }

  async loadLogs() {
    let logs = await database.get(this.path);
    _.forOwn(logs, (log, dateStr) => {
      // log: {sets: [{reps, weight, removed}]}
      this.exerciseLogs.set(dateStr, new ExerciseLogStore(this, dateStr, log))
    })
  }

  getLog(dateStr) {
    return this.exerciseLogs.get(dateStr);
  }

  // todo check if exists on that date
  addLog(dateStr, setsCount) {
    // get current
    let arr = new Array(setsCount);
    let log = {
      sets: arr.map(() => {
        return {reps: null, weight: null, removed: false}
      })
    };
    this.exerciseLogs.set(dateStr, new ExerciseLogStore(this, dateStr, log))
  }

  removeLog(dateStr) {
    this.exerciseLogs.remove(dateStr);
  }
}

class ExerciseLogStore {
  exerciseLogsStore;
  path;
  @observable dateStr;
  @observable sets = [];

  constructor(exerciseLogsStore, dateStr, log) {
    this.exerciseLogsStore = exerciseLogsStore;
    this.dateStr = dateStr;
    this.path = `${this.exerciseLogsStore.path}/${this.dateStr}`;

    if (log && log.sets) {
      log.sets.forEach((set, index) => {
        this.sets.push(new ExerciseLogSetStore(this, index, set));
      })
    }
  }

  addSet(set) {
    this.sets.push(new ExerciseLogSetStore(this, this.sets.length - 1, {
      reps: null, weight: null, removed: false
    }));
  }
}

class ExerciseLogSetStore {
  exerciseLogStore;
  index;
  path;
  @observable reps;
  @observable weight;
  @observable removed;

  constructor(exerciseLogStore, index, set) {
    this.exerciseLogStore = exerciseLogStore;
    this.index = index;
    this.path = `${this.exerciseLogStore.path}/${index}`;
    if (set) {
      this.reps = set.reps;
      this.weight = set.weight;
      this.removed = set.removed;
    }
  }

  updateReps() {
    // todo debounce
  }

  updateWeight() {
    // todo debounce
  }
}


export default new ExercisesLogsStore();
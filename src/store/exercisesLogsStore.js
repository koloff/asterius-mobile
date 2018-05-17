import {observable, computed, extendObservable, autorun, autorunAsync} from "mobx";
import _ from "lodash";
import authStore from "./authStore";
import database from "../database";
import workoutsLogsStore from './workoutsLogsStore';

class ExercisesLogsStore {
  path;
  @observable exercisesLogs = new Map();

  // init when auth change to reset
  init() {
    this.path = `exercisesLogs/${authStore.uid}`;
    extendObservable(this, {
      exercisesLogs: new Map()
    });
  }

  // returns empty exerciseLogs store, logs need to be fetched with loadExerciseLogs
  getExerciseLogs(id) {
    if (!this.exercisesLogs.has(id)) {
      let exerciseLogsStore = new ExerciseLogsStore(id);
      this.exercisesLogs.set(id, exerciseLogsStore);
    }
    return this.exercisesLogs.get(id);
  }
}

class ExerciseLogsStore {
  id;
  path;
  @observable loaded = false;
  @observable exerciseLogs = [];

  // creates empty exerciseLogs store, logs need to be fetched with loadExerciseLogs
  constructor(id) {
    this.id = id;
    this.path = `exercisesLogs/${authStore.uid}/${id}`;
  }

  // scans all performed sets and returns data
  @computed
  get setsData() {
    let foundMin = false;
    let foundMax = false;
    let max = 0;
    let min = 999999;
    let performedCount = 0;
    this.exerciseLogs.forEach(log => {
      log.sets.forEach(set => {
        if (set.performed) {
          if (set.weight && set.weight > max) {
            foundMax = true;
            max = set.weight;
          }
          if (set.weight && set.weight < min) {
            foundMin = true;
            min = set.weight;
          }
          performedCount++;
        }
      });
    });
    return {
      maxWeight: max ? max : null,
      minWeight: min ? min : null,
      weightRange: !max || !min ? 0 : max - min,
      weightRatio: !max || !min ? 0 : max / min,
      performedCount: performedCount
    };
  }


  getLog(dateStr) {
    let res = this.exerciseLogs.find((exerciseLog) => exerciseLog.dateStr === dateStr);
    if (!res) {
      console.log('');
      res = this.pushExerciseLogStore(dateStr);
    }
    return res;
  }

  pushExerciseLogStore(dateStr, log) {
    // log exists already for the date
    let res = this.exerciseLogs.find((exerciseLog) => exerciseLog.dateStr === dateStr);
    if (res) {
      return;
    }
    let exerciseLogStore = new ExerciseLogStore(this, dateStr);

    // creates and fills log store, log: {sets<array/object>: {reps, weight}}
    let sets = log && log.sets;
    if (sets) {
      if (Array.isArray(sets)) {
        sets.forEach(set => {
          if (set) {
            exerciseLogStore.addPerformedSet(set);
          } else {
            exerciseLogStore.addEmptySet();
          }
        });
      } else {
        _.forOwn(sets, set => {
          if (set) {
            exerciseLogStore.addPerformedSet(set);
          } else {
            exerciseLogStore.addEmptySet();
          }
        });
      }
    }

    // find the log position chronologically
    let index = 0;
    this.exerciseLogs.forEach((exerciseLog) => {
      if (exerciseLog.dateStr < dateStr) {
        index++;
      }
    });
    exerciseLogStore.watchAndFillSets();
    this.exerciseLogs.splice(index, 0, exerciseLogStore);
    return exerciseLogStore;
  }

  async loadExerciseLogs() {
    return new Promise(async (resolve, reject) => {
      if (!this.loaded) {
        try {
          let logs = await database.get(this.path);
          _.forOwnRight(logs, (log, dateStr) => {
            this.pushExerciseLogStore(dateStr, log)
          });
          this.loaded = true;
          return resolve();
        } catch (err) {
          console.log(err);
          return reject();
        }
      } else {
        return resolve();
      }
    })
  }
}

class ExerciseLogStore {
  exerciseLogsStore;
  path;
  @observable dateStr;
  @observable sets = [];

  constructor(exerciseLogsStore, dateStr) {
    this.exerciseLogsStore = exerciseLogsStore;
    this.dateStr = dateStr;
    this.path = `${this.exerciseLogsStore.path}/${this.dateStr}`;
  }

  watchAndFillSets() {
    autorun(() => {
      if (this.workoutTemplateExerciseStore &&
        (this.workoutTemplateExerciseStore.sets > this.setsLength)) {
        this.addEmptySet();
      }
    });
  }

  @computed
  get workoutTemplateExerciseStore() {
    let workoutLogStore = workoutsLogsStore.getWorkoutLogStore(this.dateStr);
    if (workoutLogStore) {
      return workoutLogStore.workoutTemplateStore.getWorkoutTemplateExerciseStore(
        this.exerciseLogsStore.id
      );
    }
    return null;
  }

  @computed
  get setsLength() {
    return this.sets.length;
  }

  addEmptySet() {
    this.sets.push(
      new ExerciseLogSetStore(this, this.sets.length, {
        reps: null,
        weight: null,
        removed: false
      })
    );
  }

  addPerformedSet(set) {
    this.sets.push(new ExerciseLogSetStore(this, this.sets.length, set));
  }

  remove() {
    let index = this.exerciseLogsStore.exerciseLogs.findIndex((exerciseLog) => exerciseLog.dateStr === this.dateStr);
    console.log(index);
    this.exerciseLogsStore.exerciseLogs.splice(index, 1);
    database.remove(this.path);
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
    this.path = `${this.exerciseLogStore.path}/sets/${index}`;
    this.reps = set.reps;
    this.weight = set.weight;
    this.removed = set.removed;

    autorun(() => {
      if (this.exerciseLogStore.workoutTemplateExerciseStore) {
        this.removed = this.exerciseLogStore.workoutTemplateExerciseStore.sets <= this.index;
      }
    });

    autorunAsync(() => {
      database.save(this.path + '/removed', this.removed);
    }, 500);
  }

  @computed
  get performed() {
    return !this.removed && this.reps && this.weight;
  }

  updateReps(reps) {
    this.reps = parseFloat(reps);
    database.save(`${this.path}/reps`, reps);
  }

  updateWeight(weight) {
    this.weight = weight;
    database.save(`${this.path}/weight`, weight);
  }

  @computed
  get maxWeightDifferencePercentage() {
    if (
      !this.exerciseLogStore.exerciseLogsStore.setsData.weightRange ||
      !this.weight
    ) {
      return 0;
    }
    return (
      (this.exerciseLogStore.exerciseLogsStore.setsData.maxWeight - this.weight) /
      this.exerciseLogStore.exerciseLogsStore.setsData.weightRange
    );
  }
}

export default new ExercisesLogsStore();

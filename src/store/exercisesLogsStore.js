import {observable, computed, extendObservable, observe, autorun} from "mobx";
import _ from "lodash";
import authStore from "./authStore";
import database from "../database";
import workoutsLogsStore from "./workoutsLogsStore";

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

  // returns empty exerciseLogs store, logs need to be fetched with loadLog/loadLogs
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
  @observable exerciseLogs = new Map();
  @observable lastPerformedDateStr;

  // creates empty exerciseLogs store, logs need to be fetched with loadLog/loadLogs
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

  async loadLogs() {
    if (!this.loaded) {
      let logs = await database.get(this.path);
      _.forOwnRight(logs, (log, dateStr) => {
        if (!this.exerciseLogs.has(dateStr)) {
          this.setPerformedLog(dateStr, log);
        }
      });
    }
  }

  async loadLog(dateStr) {
    let log = await database.get(`${this.path}/${dateStr}`);
    if (!this.exerciseLogs.has(dateStr)) {
      this.setPerformedLog(dateStr, log);
    }
  }

  // creates and fills log store, log: {sets<array/object>: {reps, weight}}
  setPerformedLog(dateStr, log) {
    let sets = log && log.sets;
    if (!sets) {
      return;
    }
    let exerciseLogStore = new ExerciseLogStore(this, dateStr);
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
    exerciseLogStore.watchAndFillSets();
    this.exerciseLogs.set(dateStr, exerciseLogStore);
  }

  getLog(dateStr) {
    if (!this.exerciseLogs.has(dateStr)) {
      let exerciseLogStore = new ExerciseLogStore(this, dateStr);
      exerciseLogStore.watchAndFillSets();
      this.exerciseLogs.set(dateStr, exerciseLogStore);
    }
    return this.exerciseLogs.get(dateStr);
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

  // watches the workoutStore template and adds new sets if the count grow
  // does not work if autorun is invoked in the  constructor
  // NEEDS to be invoked every time new LogStore is created!!!
  watchAndFillSets() {
    autorun(() => {
      if (
        this.workoutTemplateExerciseStore &&
        this.workoutTemplateExerciseStore.sets > this.setsLength
      ) {
        this.addEmptySet();
      }
    });
  }

  @computed
  get workoutTemplateExerciseStore() {
    let res = workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.getWorkoutTemplateExerciseStore(
      this.exerciseLogsStore.id
    );
    return res;
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
    this.exerciseLogsStore.exerciseLogs.delete(this.dateStr);
    database.remove(this.path);
  }
}

class ExerciseLogSetStore {
  exerciseLogStore;
  index;
  path;
  @observable reps;
  @observable weight;

  constructor(exerciseLogStore, index, set) {
    this.exerciseLogStore = exerciseLogStore;
    this.index = index;
    this.path = `${this.exerciseLogStore.path}/sets/${index}`;
    this.reps = set.reps;
    this.weight = set.weight;
  }

  @computed
  get removed() {
    return this.exerciseLogStore.workoutTemplateExerciseStore.sets <= this.index;
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

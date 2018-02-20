import {observable, computed, extendObservable, observe, autorun} from 'mobx';
import _ from 'lodash';
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
  @observable exerciseLogs = new Map();
  @observable lastPerformedDateStr;
  @observable maxWeight;
  @observable minWeight;

  @computed get weightRange() {
    return this.maxWeight - this.minWeight;
  }

  constructor(id) {
    this.id = id;
    this.path = `exercisesLogs/${authStore.uid}/${id}`;
  }

  addPerformedLog(dateStr, log) {
    let sets = log.sets;
    if (!sets) {
      return;
    }
    let exerciseLogStore = new ExerciseLogStore(this, dateStr);
    if (Array.isArray(sets)) {
      sets.forEach((set) => {
        if (set) {
          exerciseLogStore.addPerformedSet(set);
        } else {
          exerciseLogStore.addEmptySet();
        }
      })
    } else {
      _.forOwn(sets, (set) => {
        if (set) {
          exerciseLogStore.addPerformedSet(set)
        } else {
          exerciseLogStore.addEmptySet();
        }
      })
    }
    exerciseLogStore.watchAndFillSets();
    this.exerciseLogs.set(dateStr, exerciseLogStore);
  }

  async loadLogs() {
    let logs = await database.get(this.path);
    console.log(logs);
    _.forOwn(logs, (log, dateStr) => {
      // log: {sets: [{reps, weight, removed}]
      this.addPerformedLog(dateStr, log);
    })
  }

  async loadLog(dateStr) {
    let log = await database.get(`${this.path}/${dateStr}`);
    this.addPerformedLog(dateStr);
  }

  getLog(dateStr) {
    if (!this.exerciseLogs.has(dateStr)) {
      let exerciseLogStore = new ExerciseLogStore(this, dateStr);
      exerciseLogStore.watchAndFillSets();
      this.exerciseLogs.set(dateStr, exerciseLogStore);
    }
    return this.exerciseLogs.get(dateStr);
  }

  // todo check if exists on that date
  // addLog(dateStr, setsCount) {
  //   let exerciseLogStore = new ExerciseLogStore(this, dateStr);
  //   _.times(setsCount, () => {
  //     exerciseLogStore.addEmptySet();
  //   });
  //   this.exerciseLogs.set(dateStr, exerciseLogStore);
  // }
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
      this.workoutTemplateExerciseStore =
        workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.getWorkoutTemplateExerciseStore(
          this.exerciseLogsStore.id);

      if (this.workoutTemplateExerciseStore.sets > this.setsLength) {
        this.addEmptySet();
      }
    });
  }

  @computed get setsLength() {
    return this.sets.length;
  }

  @computed get isCurrent() {
    return workoutsLogsStore.currentWorkoutLog.dateStr = this.dateStr;
  }

  addEmptySet() {
    this.sets.push(new ExerciseLogSetStore(this, this.sets.length, {
      reps: null, weight: null, removed: false
    }));
  }

  addPerformedSet(set) {
    console.log('add performed set');
    console.log(set);
    this.sets.push(new ExerciseLogSetStore(this, this.sets.length, set));
  }

  remove() {
    // todo
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

  @computed get removed() {
    let workoutTemplateExerciseStore =
      workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.getWorkoutTemplateExerciseStore(
        this.exerciseLogStore.exerciseLogsStore.id);
    return workoutTemplateExerciseStore.sets <= this.index;
  }

  @computed get performed() {
    return !this.removed && this.reps && this.weight;
  }

  updateReps(reps) {
    this.reps = reps;
    database.save(`${this.path}/reps`, reps);
  }

  updateWeight(weight) {
    this.weight = weight;
    database.save(`${this.path}/weight`, weight);
  }

  @computed get maxWeightDifferencePercentage() {
    return this.weight / this.exerciseLogStore.exerciseLogsStore.maxWeight;
  }
}


export default new ExercisesLogsStore();
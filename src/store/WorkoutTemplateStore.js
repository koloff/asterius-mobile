import {computed, observable} from 'mobx';
import * as ec from '../algorithm/exercises/exercises-collection';
import authStore from "./authStore";
import database from "../database";
import * as Mobx from "mobx";

export default class WorkoutTemplateStore {
  @observable path;
  @observable key;
  @observable name = '';
  @observable exercises = [];
  @observable addedNewExercise = false;

  constructor(workoutTemplate, key, path) {
    console.log(workoutTemplate);
    this.setWorkout(workoutTemplate);
    this.key = key;
    this.path = path;
  }

  setWorkout(workoutTemplate) {
    this.name = workoutTemplate.name;
    if (workoutTemplate.exercises) {
      workoutTemplate.exercises.forEach((exercise) => {
        this.exercises.push(new WorkoutTemplateExerciseStore(this, exercise.id, exercise.sets));
      })
    }
  }

  getWorkoutTemplateExerciseStore(id) {
    return this.exercises.find((ex) => ex.id === id)
  }

  @computed get workoutDurationText() {
    console.log('COMPUTING');
    let minutes = 0;
    minutes += 5; // warmup

    this.exercises.forEach((exerciseStore) => {
      minutes += exerciseStore.sets * 2;
    });
    let hours = Math.floor(minutes / 60);
    let leftMinutes = minutes - hours * 60;

    if (hours && leftMinutes) {
      return `${hours} hr ${leftMinutes} min`;
    } else if (hours) {
      return `${hours} hr`
    } else {
      return `${leftMinutes} min`;
    }
  }

  rename(name) {
    this.name = name;
    try {
      console.log(this.path);
      database.save(this.path + '/name', name);
    } catch (err) {
      console.error(err);
    }
  }

  async removeWorkout() {
    return database.remove(this.path);
  }

  setAddedNewExercise(val) {
    this.addedNewExercise = val;
  }

  getExercisesAsObject() {
    return this.exercises.map((exStore) => {
      return {id: exStore.id, sets: exStore.sets}
    });
  }


  /* METHODS THAT UPDATE THE WORKOUT */

  // on slider drag
  setExerciseSetsImmediate(id, sets) {
    if (!this.getWorkoutTemplateExerciseStore(id)) {
      this.exercises.push(new WorkoutTemplateExerciseStore(this, id, sets, this.exercises.length - 1));
      this.setAddedNewExercise(true);
    } else {
      this.getWorkoutTemplateExerciseStore(id).setSets(sets);
    }
  }

  // on slider release
  setExerciseSetsFinish(id, sets) {
    if (sets === 0) {
      let index = this.getWorkoutTemplateExerciseStore(id).index;
      this.exercises.splice(index, 1);
    }
    console.log(Mobx.toJS(this.exercises));
    database.save(`${this.path}/exercises`, this.getExercisesAsObject());
  }


  moveExerciseUp(id) {
    let exerciseStore = this.getWorkoutTemplateExerciseStore(id);
    let index = exerciseStore.index;
    this.exercises.splice(index, 1);
    this.exercises.splice(index - 1, 0, exerciseStore);
    database.save(`${this.path}/exercises`, this.getExercisesAsObject());
  }

  moveExerciseDown(id) {
    let exerciseStore = this.getWorkoutTemplateExerciseStore(id);
    let index = exerciseStore.index;
    this.exercises.splice(index, 1);
    this.exercises.splice(index + 1, 0, exerciseStore);
    database.save(`${this.path}/exercises`, this.getExercisesAsObject());
  }
}

class WorkoutTemplateExerciseStore {
  workoutStore;
  id;
  @observable details;

  @observable sets;

  constructor(workoutStore, id, sets) {
    this.workoutTemplateStore = workoutStore;

    // from DB
    this.id = id;
    this.sets = sets;

    // todo from ecStore
    this.details = ec.get(id);
  }

  @computed get index() {
    return this.workoutTemplateStore.exercises.findIndex((ex) => ex.id === this.id);
  }

  setSets(sets) {
    this.sets = sets;
  }

  moveUp() {
    this.workoutTemplateStore.moveExerciseUp(this.id);
  }

  moveDown() {
    this.workoutTemplateStore.moveExerciseDown(this.id);
  }

}
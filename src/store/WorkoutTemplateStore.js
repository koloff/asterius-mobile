import {computed, observable} from 'mobx';
import * as ec from '../algorithm/exercises/exercises-collection';

export default class WorkoutTemplateStore {
  @observable name = '';
  @observable exercises = [];
  @observable addedNewExercise = false;

  constructor(workoutTemplate) {
    this.setWorkout(workoutTemplate);
  }

  setWorkout(workoutTemplate) {
    this.name = workoutTemplate.name;
    if (workoutTemplate.exercises) {
      workoutTemplate.exercises.forEach((exercise) => {
        this.exercises.push(new WorkoutTemplateExerciseStore(this, exercise.id, exercise.sets));
      })
    }
  }


  setAddedNewExercise(val) {
    this.addedNewExercise = val;
  }


  getWorkoutTemplateExerciseStore(id) {
    return this.exercises.find((ex) => ex.id === id)
  }


  setExerciseSets(id, sets) {
    if (!this.getWorkoutTemplateExerciseStore(id)) {
      this.exercises.push(new WorkoutTemplateExerciseStore(this, id, sets, this.exercises.length - 1));
      this.setAddedNewExercise(true);
    } else {
      // not in workoutTemplate
      if (sets === 0) {
        let index = this.getWorkoutTemplateExerciseStore(id).index;
        this.exercises.splice(index, 1);
      } else {
        this.getWorkoutTemplateExerciseStore(id).setSets(sets);
      }
    }
  }

  moveExerciseUp(id) {
    let exerciseStore = this.getWorkoutTemplateExerciseStore(id);
    let index = exerciseStore.index;
    this.exercises.splice(index, 1);
    this.exercises.splice(index - 1, 0, exerciseStore);
  }

  moveExerciseDown(id) {
    let exerciseStore = this.getWorkoutTemplateExerciseStore(id);
    let index = exerciseStore.index;
    this.exercises.splice(index, 1);
    this.exercises.splice(index + 1, 0, exerciseStore);
  }

  @computed get workoutDurationText() {
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
}

class WorkoutTemplateExerciseStore {
  workoutStore;
  id;
  details;

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
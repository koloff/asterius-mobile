import {computed, observable, action, extendObservable} from 'mobx';
import * as mc from '../algorithm/muscles/muscles-collection';
import * as ec from '../algorithm/exercises/exercises-collection';
import _ from 'lodash';
import subscriptionsStore from "./subscriptionsStore";
import authStore from "./authStore";

class TweakerStore {
  workoutTemplateStore;
  @observable selectedMuscleId;
  @observable exerciseOption;
  options = ['VIEW WORKOUT', 'FIND EXERCISES'];


  @action reset(workoutTemplateStore) {
    extendObservable(this, {
      selectedMuscleId: '',
      exerciseOption: 'VIEW WORKOUT'
    });
    this.workoutTemplateStore = workoutTemplateStore;
  }

  constructor(workoutTemplateStore) {
    this.reset(workoutTemplateStore);
  }

  setSelectedMuscle(id) {
    this.selectedMuscleId = id;
  }

  setExerciseOption(option) {
    this.exerciseOption = option;
  }

  @computed
  get exercisesToShow() {
    if (!this.selectedMuscleId) {
      return [];
    }

    let res = [];

    // todo for ecStore
    ec.exercises.forEach((exercise) => {
      let shouldAddExercise = true;
      let usedMusclesArr = Object.keys(exercise.musclesUsed);
      if (usedMusclesArr.indexOf(this.selectedMuscleId) < 0) {
        shouldAddExercise = false;
      }
      if (authStore.isAnonymous && exercise.premium) {
        shouldAddExercise = false;
      }
      if (shouldAddExercise) {
        res.push(exercise);
      }
    });
    res.sort((ex1, ex2) => ex2.musclesUsed[this.selectedMuscleId] - ex1.musclesUsed[this.selectedMuscleId]);
    return res;
  }
}

export default new TweakerStore();
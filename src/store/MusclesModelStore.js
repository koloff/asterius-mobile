import {computed, observable} from 'mobx';
import * as mc from '../algorithm/muscles/muscles-collection';
import _ from 'lodash';
import * as ec from "../algorithm/exercises/exercises-collection";


/**
 * Stores MuscleModel internal data
 * @param workoutStore <WorkoutTemplateStore>
 * @param selectedMusclesIds <[String]>
 * @param percentages <[{<muscleId>: <Number>}]>
 */
export default class MusclesModelStore {
  @observable muscles = [];

  constructor(workoutTemplateStore, selectedMusclesIds = [], percentages = {}) {
    this.workoutTemplateStore = workoutTemplateStore;

    mc.muscles.forEach((muscle) => {
      this.muscles.push(new MusclesModelMuscleStore(
        this,
        muscle.id,
        selectedMusclesIds.indexOf(muscle.id) >= 0,
        percentages[muscle.id] ? percentages[muscle.id] : 0,
        muscle
      ))
    })
  }

  getMusclesModelMuscleStore(id) {
    return _.find(this.muscles, {id});
  }

  switchMuscleSelected(id) {
    this.getMusclesModelMuscleStore(id).selected = !this.getMusclesModelMuscleStore(id).selected;
  }

  setMuscleSelected(id) {
    this.getMusclesModelMuscleStore(id).selected = true;
  }


  setOneSelectedMuscle(id) {
    this.muscles.forEach((muscleStore) => {
      if (muscleStore.selected && muscleStore.id !== id) {
        muscleStore.selected = false;
      }
      if (muscleStore.id === id) {
        muscleStore.selected = true;
      }
    })
  }
}


/**
 * Stores single muscle in in the MuscleModel
 */
class MusclesModelMuscleStore {
  id;
  details;
  @observable selected;
  @observable _percentage;

  constructor(musclesModelStore, id, selected = false, percentage = 0, details) {
    this.musclesModelStore = musclesModelStore;
    this.id = id;
    this.selected = selected;
    this._percentage = percentage;
    this.details = details;
  }

  @computed get percentage() {
    if (!this.musclesModelStore.workoutTemplateStore) {
      return this._percentage;
    }
    // get current volume from selected exercises and sets
    let currentVolume = 0;
    this.musclesModelStore.workoutTemplateStore.exercises.forEach((exerciseShort) => {
      let exercise = ec.get(exerciseShort.id);
      let sets = exerciseShort.sets;
      _.forOwn(exercise.musclesUsed, (percentage, id) => {
        if (this.id === id) {
          currentVolume += sets * (percentage / 100);
        }
      })
    });

    return (currentVolume / this.details.mrv) * 100;
  }
}

import {observable, extendObservable, computed} from 'mobx';
import * as Mobx from 'mobx';
import database from '../database';
import authStore from './authStore';
import _ from 'lodash';

import userParametersStore from './userParametersStore';
import MusclesModelStore from "./MusclesModelStore";
import WorkoutTemplateStore from "./WorkoutTemplateStore";
import WorkoutsTemplatesStore from "./WorkoutsTemplatesStore";
import generateSplit from '../algorithm/generate-split';


class GenerateStore {
  musclesModelStore;
  workoutsTemplatesStore;


  @observable generating = false;
  @observable generated = false;
  @observable registerFocused = false;

  init() {
    this.musclesModelStore = new MusclesModelStore();
    console.log(this.musclesModelStore);
    this.workoutsTemplatesStore = new WorkoutsTemplatesStore();
    this.workoutsTemplatesStore.listenChildRemoved();

    // RESET
    extendObservable(this, {
      workouts: [],
      generating: false,
      generated: false
    });

    userParametersStore.parameters.preferredMuscles.forEach((muscleId) => {
      this.musclesModelStore.setMuscleSelected(muscleId);
    });
  }

  async generateWorkouts() {
    return new Promise(async (resolve, reject) => {
      try {
        await userParametersStore.saveUserParameters();

        let userParameters = Mobx.toJS(userParametersStore.parameters);
        let result = generateSplit(
          userParameters.gender,
          userParameters.days,
          userParameters.duration,
          userParameters.fitnessLevel,
          userParameters.preferredMuscles
        );

        let workouts = [];
        _.forOwn(result, (workout, letter) => {
          workouts.push({
            name: `Workout ${letter}`,
            exercises: workout
          })
        });


        if (authStore.isAnonymous) {
          await database.save(`/workoutsTemplates/${authStore.uid}`, {});
        }

        for (let i = workouts.length - 1; i >= 0; i--) {
          let ref = await database.push(`/workoutsTemplates/${authStore.uid}`, workouts[i]);
          this.workoutsTemplatesStore.workouts.unshift({
            workoutStore: new WorkoutTemplateStore(workouts[i], ref.path),
            key: ref.key
          });
        }

        return resolve();
      }
      catch (err) {
        console.log(err);
        return reject(false);
      }
    })
  }

  @computed get enoughTimeForIsolation() {
    let preferredMusclesCount = userParametersStore.parameters.preferredMuscles.length;
    let days = userParametersStore.parameters.days;
    let duration = userParametersStore.parameters.duration;

    if (!preferredMusclesCount) {
      return true;
    }
    return (days * duration) / preferredMusclesCount >= 23
  }

  deleteGeneratedWorkouts() {
    this.workoutsTemplatesStore.removeWorkoutsInCurrentStore();
  }
}

let generateStore = new GenerateStore();
export default generateStore;
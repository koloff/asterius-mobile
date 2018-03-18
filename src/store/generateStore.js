import {observable, extendObservable, reaction} from 'mobx';
import database from '../database';
import authStore from './authStore';
import _ from 'lodash';
import * as Mobx from 'mobx';

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

  async generateWorkout() {
    return new Promise(async (resolve, reject) => {
      try {
        await userParametersStore.saveUserParameters();
        let result = generateSplit(Mobx.toJS(userParametersStore.parameters));

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
        //todo
        for (let i = 0; i < workouts.length; i++) {
          let ref = await database.push(`/workoutsTemplates/${authStore.uid}`, workouts[i]);
          this.workoutsTemplatesStore.workouts.push({
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

  deleteGeneratedWorkouts() {
    this.workoutsTemplatesStore.removeWorkoutsInCurrentStore();
  }
}

let generateStore = new GenerateStore();
export default generateStore;
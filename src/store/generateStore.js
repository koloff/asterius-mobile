import {observable, extendObservable, reaction} from 'mobx';
import database from '../database';
import authStore from './authStore';
import _ from 'lodash';

import userParametersStore from './userParametersStore';
import MusclesModelStore from "./MusclesModelStore";
import WorkoutTemplateStore from "./WorkoutTemplateStore";
import WorkoutsTemplatesStore from "./WorkoutsTemplatesStore";


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

    // const preferredMusclesReaction = reaction(
    //   () => userParametersStore.parameters.preferredMuscles,
    //   preferredMuscles => {
    //     preferredMuscles.forEach((muscleId) => {
    //       this.musclesModelStore.setMuscleSelected(muscleId);
    //     });
    //   }, {
    //     context: this
    //   },
    // );

  }

  async generateWorkout() {
    return new Promise(async (resolve, reject) => {
      try {
        await userParametersStore.saveUserParameters();

        let res = {
          workouts: [
            {
              name: 'Workout A',
              createdAt: Date.now(),
              routineId: 'ROUTINE_1',
              routineNumber: 1,
              exercises: [
                {id: 'reversePecDeck', sets: 3},
                {id: 'highCableCrossover', sets: 3},
                {id: 'ropePushdown', sets: 77},
                {id: 'dumbbellShoulderPress', sets: 4},
                {id: 'lowCableCrossover', sets: 3},
                {id: 'dumbbellInclineBenchPress', sets: 4},
                {id: 'seatedTricepsPress', sets: 3}
              ]
            },
            {
              name: 'Workout B',
              createdAt: Date.now(),
              routineId: 'ROUTINE_1',
              routineNumber: 2,
              exercises: [
                {id: 'cableRow', sets: 4},
                {id: 'latPulldownWideGrip', sets: 4},
                {id: 'cableExternalRotation', sets: 3},
                {id: 'reversePecDeck', sets: 4},
                {id: 'inclineDumbbellCurl', sets: 2},
                {id: 'dumbbellShrug', sets: 3},
                {id: 'overheadCableCurl', sets: 3}
              ]
            },
            {
              name: 'Workout C',
              createdAt: Date.now(),
              routineId: 'ROUTINE_1',
              routineNumber: 3,
              exercises: [
                {id: 'smithMachineCalfRaise', sets: 4},
                {id: 'barbellSquat', sets: 4},
                {id: 'legExtension', sets: 4},
                {id: 'crunches', sets: 4},
                {id: 'legCurl', sets: 4}
              ]
            },
          ]
        };

        if (authStore.isAnonymous) {
          await database.save(`/workoutsTemplates/${authStore.uid}`, {});
        }


        //todo
        for (let i = 0; i < res.workouts.length; i++) {
          let ref = await database.push(`/workoutsTemplates/${authStore.uid}`, res.workouts[i]);
          this.workoutsTemplatesStore.workouts.push({
            workoutStore: new WorkoutTemplateStore(res.workouts[i], ref.path),
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
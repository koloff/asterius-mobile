let _ = require('lodash');
let lpSolver = require('./solver/main');

let mc = require('./muscles/muscles-collection');
let ec = require('./exercises/exercises-collection');

// TODO (optional): add constraint for minimum compound lifts; add type parameter to exercise collection
/**
 * Get parameters object and returns exercises array in the form: [{exerciseid: setsCount}]
 */
function generateVolume(parameters) {
  let gender = parameters.gender;
  let trainedMuscles = parameters.trainedMuscles;
  let preferredMuscles = parameters.preferredMuscles;
  let sets = parameters.sets;
  let mevMultiplier = parameters.mevMultiplier;
  let mrvMultiplier = parameters.mrvMultiplier;
  let minIsolationSetsCount = parameters.minIsolationSetsCount;
  let minExerciseSetsCount = parameters.minExerciseSetsCount;
  let maxExerciseSetsCount = parameters.maxExerciseSetsCount;

  let muscles = mc.muscles;
  let exercises = ec.exercises;


  // ILPP model constraints
  let constraints = {};
  // ILPP model variables
  let variables = {};

  constraints.sets = {
    max: sets
  };

  let isolationExercisesForPreferredMuscles = [];


  let allMuscles = [];
  // add the preferred muscles in the beginning for priority reasons
  preferredMuscles.forEach((mId) => {
    allMuscles.push(mId)
  });
  // then add all trained muscles
  trainedMuscles.forEach((mId) => {
    if (allMuscles.indexOf(mId) < 0) {
      allMuscles.push(mId);

      //for women only
      if (gender === 2) {
        if (mId === mc.ids.back.upperTrapezius) {
          allMuscles.splice(-1, 1);
        }
      }
    }
  });

  allMuscles.forEach((mId) => {
    constraints[mId] = {};
    // do not overtrain muscles
    constraints[mId].max = (mc.get(mId).mrv * 100 /*in percentage*/) * mrvMultiplier;
    // do not undertrain muscles
    constraints[mId].min = (mc.get(mId).mev * 100 /*in percentage*/) * mevMultiplier;
    // if muscles is preferred, get its isolation exercise
    if (preferredMuscles.indexOf(mId) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseId(mId));
    }
  });

  // create int and binaries variables types
  let ints = {};
  let binaries = {};

  for (let i = 0; i < exercises.length; i++) {
    let exercise = exercises[i];
    // EXERCISE SIDE CASES
    if (gender === 1) {
      if (exercise.id === ec.ids.legs.hipThrust && !(preferredMuscles.indexOf(mc.ids.legs.glutes) >= 0)) {
        continue;
      }
    }

    if (gender === 2) {
      if (exercise.id === ec.ids.back.dumbbellShrug && !(preferredMuscles.indexOf(mc.ids.back.upperTrapezius) >= 0)) {
        continue;
      }
    }


    let exerciseVar = {};

    // calculate exercise volume for the muscles it trains and are chosen
    let trainedMusclesVolume = 0;
    _.forOwn(exercise.musclesUsed, (percentage, mId) => {
      exerciseVar[mId] = percentage;
      if (trainedMuscles.indexOf(mId) >= 0) {
        trainedMusclesVolume += percentage;
      }
    });

    if (trainedMusclesVolume > 0 || isolationExercisesForPreferredMuscles.indexOf(exercise.id) >= 0) {
      // create ILPP constraints for each exercise
      constraints[exercise.id] = {};
      // create ILPP variable for each exercise

      // if the exercise isolates any of the maximum preferred muscles add it
      if (isolationExercisesForPreferredMuscles.indexOf(exercise.id) >= 0 && minIsolationSetsCount > 0) {
        constraints[exercise.id].min = minIsolationSetsCount;
      } else {
        // the exercise sets can be 0 or in the range [min, max]
        // there is no SEC type in jsLpSolver, so we create a fix by using a slack variable for each exercise
        constraints[exercise.id].min = minExerciseSetsCount;
        binaries[`${exercise.id}_slack`] = 1;
        constraints[`${exercise.id}_slack`] = {max: 1};
        variables[`${exercise.id}_slack`] = {[exercise.id]: maxExerciseSetsCount, [`${exercise.id}_slack`]: 1};
        exerciseVar[`${exercise.id}_slack`] = 1 / maxExerciseSetsCount;
      }

      constraints[exercise.id].max = maxExerciseSetsCount;
      exerciseVar.sets = 1;
      exerciseVar[exercise.id] = 1;
      exerciseVar['trainedMusclesVolume'] = trainedMusclesVolume;
      variables[exercise.id] = exerciseVar;
      ints[exercise.id] = 1;
    }
  }


  // console.log('---------------------------LOGS---------------------------');
  // console.log(constraints);
  // console.log(variables);
  // console.log(ints);
  // console.log(binaries);

  let result = lpSolver.Solve({
    optimize: 'trainedMusclesVolume',
    opType: 'max',
    constraints: constraints,
    variables: variables,
    ints,
    binaries
  });

  let workout = [];


  if (result.feasible) {
    _.forOwn(result, (item, id) => {
      if (id.indexOf('slack') < 0 && item > 0
        && !(id === 'feasible' || id === 'result' || id === 'bounded')) {
        workout.push({id: id, sets: item})
      }
    });
  }

  //
  // trainedMuscles.forEach((mId) => {
  //   console.log(mId);
  //   let currentVolume = 0;
  //   workout.forEach((exShort) => {
  //     let exercise = ec.get(exShort.id);
  //     _.forOwn(exercise.musclesUsed, (percentage, id) => {
  //       if (mId === id) {
  //         currentVolume += exShort.sets * (percentage / 100);
  //       }
  //     })
  //   });
  //   console.log((currentVolume / mc.get(mId).mev) * 100);
  // });
  // console.log('---------------------------END LOGS---------------------------');

  let ordered = orderWorkout(workout);
  console.log(ordered);
  return ordered;
}


function getIsolationExerciseId(muscleId) {
  let currentExerciseId = '';
  let currentMaxPercentage = 0;
  ec.exercises.forEach((exercise) => {
    _.forOwn(exercise.musclesUsed, (percentage, mId) => {
      if (mId === muscleId && percentage >= currentMaxPercentage) {
        currentExerciseId = exercise.id;
        currentMaxPercentage = percentage;
      }
    })
  });

  // console.log('__________________________');
  // console.log(currentExerciseId, currentMaxPercentage);
  // console.log('________________________');

  return currentExerciseId;
}

function getExerciseLoad(exercise) {
  let load = 0;
  _.forOwn(exercise.musclesUsed, (percentage, mId) => {
    let muscle = mc.get(mId);
    load += percentage * (muscle.mev + muscle.mrv);
  });
  return load;
}

function orderWorkout(workout) {
  let result = workout.sort((ex1, ex2) => {
    let exercise1 = ec.get(ex1.id);
    let exercise2 = ec.get(ex2.id);

    if (exercise1.type === 'compound' && exercise2.type === 'isolation') {
      return -1;
    }
    if (exercise1.type === 'isolation' && exercise2.type === 'compound') {
      return 1;
    }

    return getExerciseLoad(exercise2) - getExerciseLoad(exercise1)
  });
  return result;
}


module.exports = generateVolume;
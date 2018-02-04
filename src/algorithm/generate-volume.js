let _ = require('lodash');
let lpSolver = require('../lib/lp-solver/original/solver');

let mc = require('./muscles/muscles-collection');
let ec = require('./exercises/exercises-collection');

// TODO (optional): add constraint for minimum compound lifts; add type parameter to exercise collection
/**
 * Get parameters object and returns exercises array in the form: [{exerciseKey: setsCount}]
 */
function generateVolume(parameters) {
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


  console.log('TRAINED MUSCLES');
  console.log(trainedMuscles);

  console.log('PREFERRED MUSCLES');
  console.log(preferredMuscles);


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
  preferredMuscles.forEach((mKey) => {
    allMuscles.push(mKey)
  });
  // then add all trained muscles
  trainedMuscles.forEach((mKey) => {
    if (allMuscles.indexOf(mKey) < 0) {
      allMuscles.push(mKey);
    }
  });

  allMuscles.forEach((mKey) => {
    constraints[mKey] = {};
    // do not overtrain muscles
    constraints[mKey].max = (mc.get(mKey).mrv * 100 /*in percentage*/) * mrvMultiplier;
    // do not undertrain muscles
    constraints[mKey].min = (mc.get(mKey).mev * 100 /*in percentage*/) * mevMultiplier;
    // if muscles is preferred, get its isolation exercise
    if (preferredMuscles.indexOf(mKey) >= 0) {
      isolationExercisesForPreferredMuscles.push(getIsolationExerciseKey(mKey));
    }
  });

  // create int and binaries variables types
  let ints = {};
  let binaries = {};
  exercises.forEach((exercise) => {
    let exerciseVar = {};

    // calculate exercise volume for the muscles it trains and are chosen
    let trainedMusclesVolume = 0;
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      exerciseVar[mKey] = percentage;
      if (trainedMuscles.indexOf(mKey) >= 0) {
        trainedMusclesVolume += percentage;
      }
    });

    if (trainedMusclesVolume > 0 || isolationExercisesForPreferredMuscles.indexOf(exercise.key) >= 0) {
      // create ILPP constraints for each exercise
      constraints[exercise.key] = {};
      // create ILPP variable for each exercise

      // if the exercise isolates any of the maximum preferred muscles add it
      if (isolationExercisesForPreferredMuscles.indexOf(exercise.key) >= 0 && minIsolationSetsCount > 0) {
        constraints[exercise.key].min = minIsolationSetsCount;
      } else {
        // the exercise sets can be 0 or in the range [min, max]
        // there is no SEC type in jsLpSolver, so we create a fix by using a slack variable for each exercise
        constraints[exercise.key].min = minExerciseSetsCount;
        binaries[`${exercise.key}_slack`] = 1;
        constraints[`${exercise.key}_slack`] = {max: 1};
        variables[`${exercise.key}_slack`] = {[exercise.key]: maxExerciseSetsCount, [`${exercise.key}_slack`]: 1};
        exerciseVar[`${exercise.key}_slack`] = 1 / maxExerciseSetsCount;
      }

      constraints[exercise.key].max = maxExerciseSetsCount;
      exerciseVar.sets = 1;
      exerciseVar[exercise.key] = 1;
      exerciseVar['trainedMusclesVolume'] = trainedMusclesVolume;
      variables[exercise.key] = exerciseVar;
      ints[exercise.key] = 1;
    }
  });


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
    _.forOwn(result, (item, key) => {
      if (key.indexOf('slack') < 0 && item > 0
        && !(key === 'feasible' || key === 'result' || key === 'bounded')) {
        workout.push({key: key, sets: item})
      }
    });
  }

  // console.log('---------------------------LOGS---------------------------');
  // console.log(constraints);
  // console.log(variables);
  // console.log(ints);
  // console.log(binaries);
  // console.log('__________________________________________');
  // console.log('SOLUTION');
  // console.log(exercises);
  // trainedMuscles.forEach((mKey) => {
  //   console.log(mKey);
  //   let currentVolume = 0;
  //   exercises.forEach((exShort) => {
  //     let exercise = ec.get(exShort.key);
  //     _.forOwn(exercise.musclesUsed, (percentage, key) => {
  //       if (mKey === key) {
  //         currentVolume += exShort.sets * (percentage / 100);
  //       }
  //     })
  //   });
  //   console.log((currentVolume / mc.get(mKey).mev) * 100);
  // });
  //
  // console.log('---------------------------END LOGS---------------------------');

  return workout;
}


function getIsolationExerciseKey(muscleKey) {
  let currentExerciseKey = '';
  let currentMaxPercentage = 0;
  ec.exercises.forEach((exercise) => {
    _.forOwn(exercise.musclesUsed, (percentage, mKey) => {
      if (mKey === muscleKey && percentage >= currentMaxPercentage) {
        currentExerciseKey = exercise.key;
        currentMaxPercentage = percentage;
      }
    })
  });


  // console.log('__________________________');
  // console.log(currentExerciseKey, currentMaxPercentage);
  // console.log('________________________');

  return currentExerciseKey;
}

module.exports = generateVolume;
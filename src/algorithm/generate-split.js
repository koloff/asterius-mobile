let _ = require('lodash');
let mc = require('./muscles/muscles-collection');

let generateVolume = require('./generate-volume');
let calculateFitnessLevel = require('./calculate-fitness-level');
let splits = require('./splits');


function generateSingleWorkout(options) {
  let workout = generateVolume(options);
  if (!workout.length) {
    // if preferred muscles are too much, replace isolation exercises with compound lifts
    options.minIsolationSetsCount = 0;
    workout = generateVolume(options);
    // if still cannot generate volume -> remove preferred muscles
    if (!workout.length) {
      options.preferredMuscles = [];
      workout = generateVolume(options);
    }
  }
  return workout;
}

function generateSplit(userParameters, userPreferredMuscles) {
  let fitnessLevel = calculateFitnessLevel(userParameters);

  // At 1-2 training sessions per week generate FULL BODY workouts
  if (userParameters.days === '1-2') {
    let fullBodyOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 26,
      mevMultiplier: 0.9,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 2,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 5
    };

    // generate full body workout
    fullBodyOptions.trainedMuscles = _.clone(splits.fullBody);
    fullBodyOptions.preferredMuscles = _.clone(userPreferredMuscles);

    let A = generateSingleWorkout(fullBodyOptions);
    return {A};
  }

  // At 3-4 training sessions per week generate upper/lower workouts
  else if (userParameters.days === '3-4') {

    // Training A: UPPER BODY
    let upperOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 22,
      mevMultiplier: 1.1,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    upperOptions.trainedMuscles = _.clone(splits.upperBody);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('upperBody') >= 0) {
        upperOptions.preferredMuscles.push(muscle.key)
      }

    });

    let A = generateSingleWorkout(upperOptions);

    // Training B: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 22,
      mevMultiplier: 1,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.key)
      }
    });

    let B = generateSingleWorkout(lowerOptions);

    return {A, B};
  }



  // At 5-6 training sessions per week generate push/pull/legs workouts
  else {
    // training A: PUSH
    let pushOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 18,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    pushOptions.trainedMuscles = _.clone(splits.push);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('push') >= 0) {
        pushOptions.preferredMuscles.push(muscle.key)
      }
    });

    let A = generateSingleWorkout(pushOptions);

    // training B: PULL
    let pullOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 18,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 2,
      maxExerciseSetsCount: 4
    };

    pullOptions.trainedMuscles = _.clone(splits.pull);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('pull') >= 0) {
        pullOptions.preferredMuscles.push(muscle.key)
      }
    });

    let B = generateSingleWorkout(pullOptions);

    // training C: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: 18,
      mevMultiplier: 1.2,
      mrvMultiplier: fitnessLevel * 1.1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    userPreferredMuscles.forEach(mKey => {
      let muscle = mc.get(mKey);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.key)
      }
    });

    let C = generateSingleWorkout(lowerOptions);

    return {A, B, C};
  }
}

module.exports = generateSplit;
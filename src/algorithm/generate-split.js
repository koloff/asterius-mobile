let _ = require('lodash');
let mc = require('./muscles/muscles-collection');

let generateVolume = require('./generate-volume');
let calculateFitnessLevel = require('./calculate-fitness-level');
let splits = require('./splits');


let PARAMS = {
  gender: 1, // 1 - malePoints, 2 - femalePoints
  measuringUnit: 1, // 1 - metric, 2 - imperial
  age: '',
  weight: '',
  height: '',
  experience: 2, // 1-4
  days: 2, // 1-3 (1/2, 3/4, 5/6)
  duration: 70, // minutes
  preferredMuscles: [],
  activity: 3,
  goal: 3, // 1-5 (1-loose fat, 5 - gain weight),
  fitnessLevel: 1
};

function generateSingleWorkout(options) {
  console.log('generating...');
  let workout = generateVolume(options);

  console.log('generated');

  if (!workout.length) {
    // if preferred muscles are too much, reduce mev
    options.mevMultiplier = options.mevMultiplier / 2;
    workout = generateVolume(options);

    if (!workout.length) {
      // if preferred muscles are too much, replace isolation exercises with compound lifts
      options.mevMultiplier = options.mevMultiplier * 2;
      options.preferredMuscles = [];
      workout = generateVolume(options);

      if (!workout.length) {
        // if still cannot generate, reduce mev
        options.mevMultiplier = options.mevMultiplier / 2;
        workout = generateVolume(options);
      }
    }
  }


  return workout;
}

function generateSplit(userParameters) {
  let userPreferredMuscles = userParameters.preferredMuscles;
  let fitnessLevel = userParameters.fitnessLevel;
  let sets = Math.round((userParameters.duration - 5) / 2.5);

  // At 1-2 training sessions per week generate FULL BODY workouts
  if (userParameters.days === 1) {
    let fullBodyOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 5
    };

    // generate full body workoutStore
    fullBodyOptions.trainedMuscles = _.clone(splits.fullBody);
    fullBodyOptions.preferredMuscles = _.clone(userPreferredMuscles);

    let A = generateSingleWorkout(fullBodyOptions);
    return {A};
  }

  // At 3-4 training sessions per week generate upper/lower workouts
  else if (userParameters.days === 2) {

    // Training A: UPPER BODY
    let upperOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel * 1.1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 5
    };

    upperOptions.trainedMuscles = _.clone(splits.upperBody);
    userPreferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('upperBody') >= 0) {
        upperOptions.preferredMuscles.push(muscle.id)
      }

    });

    let A = generateSingleWorkout(upperOptions);

    // Training B: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 5
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    userPreferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.id)
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
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 5
    };

    pushOptions.trainedMuscles = _.clone(splits.push);
    userPreferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('push') >= 0) {
        pushOptions.preferredMuscles.push(muscle.id)
      }
    });

    let A = generateSingleWorkout(pushOptions);

    // training B: PULL
    let pullOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 5
    };

    pullOptions.trainedMuscles = _.clone(splits.pull);
    userPreferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('pull') >= 0) {
        pullOptions.preferredMuscles.push(muscle.id)
      }
    });

    let B = generateSingleWorkout(pullOptions);

    // training C: LOWER BODY
    let lowerOptions = {
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 5
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    userPreferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('lowerBody') >= 0 || muscle.info.group === 'Core') {
        lowerOptions.preferredMuscles.push(muscle.id)
      }
    });

    let C = generateSingleWorkout(lowerOptions);

    return {A, B, C};
  }
}

// console.time('someFunction');
// generateSplit(PARAMS, [])//['chestSternalHead', 'legsGlutes', 'legsQuadriceps', 'coreAbs']);
// console.timeEnd('someFunction');


module.exports = generateSplit;
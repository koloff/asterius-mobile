let _ = require('lodash');
let mc = require('./muscles/muscles-collection');
let ecIds = require('./exercises/exercises-ids');
let generateVolume = require('./generate-volume');
let splits = require('./splits');


// side case workout
const sideCaseWorkout = [
  {id: ecIds.legs.barbellSquat, sets: 4},
  {id: ecIds.chest.dumbbellBenchPress, sets: 4},
  {id: ecIds.back.latPulldownWideGrip, sets: 4},
  {id: ecIds.shoulders.lateralRaise, sets: 2},
  {id: ecIds.shoulders.reversePecDeck, sets: 2},
  {id: ecIds.triceps.tricepsPushdown, sets: 2},
  {id: ecIds.biceps.barbellCurl, sets: 2},
];


function generateSingleWorkout(options) {
  let workout;

  workout = generateVolume(options);
  if (workout.length) {
    console.log('111111111 try');
    return workout;
  }

  // if preferred muscles are too much, reduce isolation sets
  options.minIsolationSetsCount = 2;
  workout = generateVolume(options);
  if (workout.length) {
    console.log('22222222222 try');
    return workout;
  }


  // if preferred muscles are too much, reduce mev
  options.mevMultiplier = options.mevMultiplier / 2;
  workout = generateVolume(options);
  if (workout.length) {
    console.log('333333333333 try');
    return workout;
  }


  // if preferred muscles are too much, replace isolation exercises with compound lifts
  options.minIsolationSetsCount = 0;
  // options.minIsolationSetsCount = 0;
  workout = generateVolume(options);
  if (workout.length) {
    console.log('4444444444 try');
    return workout;
  }

  if (options.single) {
    console.log('side case of single workout');
    return sideCaseWorkout;
  }

  // if still cannot generate, increase time
  options.sets += 4;
  workout = generateVolume(options);
  if (workout.length) {
    console.log('5555555555 try');
    return workout;
  }


  console.log('WARNIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIING');
}

function generateSplit(gender, days, duration, fitnessLevel, preferredMuscles) {
  console.log(arguments);

  let sets = Math.round((duration - 5) / 2.5);

  // At 1-2 training sessions per week generate FULL BODY workouts
  if (days === 1) {
    let fullBodyOptions = {
      gender,
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    // generate full body workoutStore
    fullBodyOptions.trainedMuscles = _.clone(splits.fullBody);
    fullBodyOptions.preferredMuscles = _.clone(preferredMuscles);

    let A = generateSingleWorkout({...fullBodyOptions, single: true});
    return {A};
  }

  // At 3-4 training sessions per week generate upper/lower workouts
  else if (days === 2) {

    // Training A: UPPER BODY
    let upperOptions = {
      gender,
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel * 1.1,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    upperOptions.trainedMuscles = _.clone(splits.upperBody);
    preferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('upperBody') >= 0) {
        upperOptions.preferredMuscles.push(muscle.id)
      }

    });

    let A = generateSingleWorkout(upperOptions);

    // Training B: LOWER BODY
    let lowerOptions = {
      gender,
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    preferredMuscles.forEach(mId => {
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
      gender,
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    pushOptions.trainedMuscles = _.clone(splits.push);
    preferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('push') >= 0) {
        pushOptions.preferredMuscles.push(muscle.id)
      }
    });

    let A = generateSingleWorkout(pushOptions);

    // training B: PULL
    let pullOptions = {
      gender,
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    pullOptions.trainedMuscles = _.clone(splits.pull);
    preferredMuscles.forEach(mId => {
      let muscle = mc.get(mId);
      if (muscle.types.indexOf('pull') >= 0) {
        pullOptions.preferredMuscles.push(muscle.id)
      }
    });

    let B = generateSingleWorkout(pullOptions);

    // training C: LOWER BODY
    let lowerOptions = {
      gender,
      trainedMuscles: [],
      preferredMuscles: [],
      sets: sets,
      mrvMultiplier: fitnessLevel,
      mevMultiplier: fitnessLevel,
      minIsolationSetsCount: 3,
      minExerciseSetsCount: 3,
      maxExerciseSetsCount: 4
    };

    lowerOptions.trainedMuscles = _.clone(splits.lowerBody);
    preferredMuscles.forEach(mId => {
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
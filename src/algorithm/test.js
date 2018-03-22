let _ = require('lodash');
let generateSplit = require('./generate-split');
let musclesIds = require('./muscles/muscles-ids');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomGender(option) {
  let genderOptions = [1, 2];
  return genderOptions[option];
}

function getRandomDays(option) {
  let daysOptions = [1, 2, 3];
  return daysOptions[option];
}

function getRandomFitnessLevel(option) {
  let fitnessLevelsOptions = [0.8, 1, 1.2];
  return fitnessLevelsOptions[option];
}

function getRandomDuration(option) {
  let durationsOptions = [getRandomInt(55, 60), getRandomInt(65, 70), getRandomInt(80, 80)];
  return durationsOptions[option];
}

function getRandomMuscles(option) {
  // (22 muscles)
  let musclesOptions = [[], [], []];

  _.forOwn(musclesIds, (group) => {
    _.forOwn(group, (id) => {
      if (Math.random() < 4 / 22) {
        musclesOptions[1].push(id);
      }
      if (Math.random() < 5 / 22) {
        musclesOptions[2].push(id);
      }
    })
  });

  return musclesOptions[option];
}


// make 5 tests
for (let i = 0; i < 21; i++) {
  let gender = getRandomGender(getRandomInt(0, 1));
  let days = getRandomDays(getRandomInt(0, 0));
  let duration = getRandomDuration(getRandomInt(0, 2));
  let fitnessLevel = getRandomFitnessLevel(getRandomInt(0, 2));
  let preferredMuscles = getRandomMuscles(getRandomInt(1, 2));

  console.log('---------------------');
  console.log(gender, days, duration, fitnessLevel, preferredMuscles);

  console.time(`Test ${i}`);
  generateSplit(gender, days, duration, fitnessLevel, preferredMuscles);
  console.timeEnd(`Test ${i}`);
}

let mapRange = require('../utils/map-range');

/**
 * Returns number in the (0, 1) range, where 1 === biggest possible level
 * @param userParameters gender, measuringUnit, weight, height, experience
 */
function calculateFitnessLevel(userParameters) {
  // start maximally and reduce
  let level = 1;

  let experienceMultiplier;
  switch (userParameters.experience) {
    case 'untrained':
      experienceMultiplier = 0.7;
      break;
    case 'beginner':
      experienceMultiplier = 0.8;
      break;
    case 'advanced':
      experienceMultiplier = 0.9;
      break;
    case 'expert':
      experienceMultiplier = 1;
      break;
    default:
      experienceMultiplier = 0.8;
  }

  let bmi = userParameters.weight / (userParameters.height ** 2);
  let bmiMultiplier;
  if (bmi >= 0.0022 && bmi <= 0.0029) {
    bmiMultiplier = 1;
  } else {
    // overweight or underweight
    bmiMultiplier = 0.8;
  }


  level *= experienceMultiplier;
  level *= bmiMultiplier;

  return level;
}

module.exports = calculateFitnessLevel;
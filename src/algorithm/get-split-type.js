let _ = require('lodash');

module.exports = function getSplitType(trainingDays) {
  let minimized = [];
  _.forOwn(trainingDays, (value, day) => {
    if (value) {
      minimized.push(day);
    } else {
      minimized.push(0);
    }
  });

  let days = [];
  for (let i = 0; i < minimized.length; i++) {
    if (minimized[i]) {
      days.push({dayIndex: i, restDaysAfterCount: 0});
    } else {
      if (days.length > 0) {
        days[days.length - 1].restDaysAfterCount++;
      }
    }
  }
  // get rest days after last session in the week
  for (let i = 0; i < minimized.length; i++) {
    if (!minimized[i] && days.length > 0) {
      days[days.length - 1].restDaysAfterCount++;
    } else {
      break;
    }
  }

  let result = [];
  if (days.length === 1) {
    result = {
      str: 'A',
      days: [{
        day: minimized[days[0].dayIndex],
        trainingType: 'A'
      }]
    };
  } else if (days.length === 2) {
    if (days[0].restDaysAfterCount === 0 || days[1].restDaysAfterCount === 0) {
      result = {
        str: 'AB',
        days: [
          {
            day: minimized[days[0].dayIndex],
            trainingType: 'A'
          },
          {
            day: minimized[days[1].dayIndex],
            trainingType: 'B'
          },
        ]
      }
    } else {
      result = {
        str: 'AA',
        days: [
          {
            day: minimized[days[0].dayIndex],
            trainingType: 'A'
          },
          {
            day: minimized[days[1].dayIndex],
            trainingType: 'A'
          },
        ]
      }
    }
  } else if (days.length === 3) {
    if (days[days.length - 1].restDaysAfterCount === 0) {
      result = {
        str: 'BAA',
        days: [
          {
            day: minimized[days[0].dayIndex],
            trainingType: 'B'
          },
          {
            day: minimized[days[1].dayIndex],
            trainingType: 'A'
          },
          {
            day: minimized[days[2].dayIndex],
            trainingType: 'A'
          },
        ]
      }
    }
    else {
      result = {
        str: 'ABA',
        days: [
          {
            day: minimized[days[0].dayIndex],
            trainingType: 'A'
          },
          {
            day: minimized[days[1].dayIndex],
            trainingType: 'B'
          },
          {
            day: minimized[days[2].dayIndex],
            trainingType: 'A'
          },
        ]
      }
    }
  } else if (days.length === 4) {
    result = {
      str: 'ABAB',
      days: [
        {
          day: minimized[days[0].dayIndex],
          trainingType: 'A'
        },
        {
          day: minimized[days[1].dayIndex],
          trainingType: 'B'
        },
        {
          day: minimized[days[2].dayIndex],
          trainingType: 'A'
        },
        {
          day: minimized[days[3].dayIndex],
          trainingType: 'B'
        }]
    }
  } else if (days.length === 5) {
    result = {
      str: 'ABCAB',
      days: [
        {
          day: minimized[days[0].dayIndex],
          trainingType: 'A'
        },
        {
          day: minimized[days[1].dayIndex],
          trainingType: 'B'
        },
        {
          day: minimized[days[2].dayIndex],
          trainingType: 'C'
        },
        {
          day: minimized[days[3].dayIndex],
          trainingType: 'A'
        },
        {
          day: minimized[days[4].dayIndex],
          trainingType: 'B'
        }
      ]
    }
  } else if (days.length === 6) {
    result = {
      str: 'ABCAB',
      days: [{
        day: minimized[days[0].dayIndex],
        trainingType: 'A'
      },
        {
          day: minimized[days[1].dayIndex],
          trainingType: 'B'
        },
        {
          day: minimized[days[2].dayIndex],
          trainingType: 'C'
        },
        {
          day: minimized[days[3].dayIndex],
          trainingType: 'A'
        },
        {
          day: minimized[days[4].dayIndex],
          trainingType: 'B'
        },
        {
          day: minimized[days[5].dayIndex],
          trainingType: 'C'
        },
      ]
    }
  }

  return result;
};
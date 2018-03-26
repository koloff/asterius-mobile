let _ = require('lodash');
let mc = require('../muscles/muscles-collection');
let Exercise = require('./exercise');
let ids = require('./exercises-ids');


const types = {
  compound: 'compound',
  isolation: 'isolation'
};


// todo add more upperTrapezius volume in exercises
//noinspection JSUnresolvedFunction
let exercises = [

  // Chest

  new Exercise({
    id: ids.chest.dumbbellBenchPress,
    type: types.compound,
    musclesUsed: {
      [mc.ids.chest.sternalHead]: 30,
      [mc.ids.chest.clavicularHead]: 25,
      [mc.ids.shoulders.anteriorHead]: 20,
      [mc.ids.triceps.longHead]: 12.5,
      [mc.ids.triceps.shortHead]: 12.5,
      // stabilizers
      [mc.ids.forearms.flexors]: 7.5,
      [mc.ids.forearms.extensors]: 7.5,

    },
    info: {
      name: 'Dumbbell Bench Press',
      group: 'Chest'
    }
  }),

  new Exercise({
    id: ids.chest.dumbbellInclineBenchPress,
    type: types.compound,
    musclesUsed: {
      [mc.ids.chest.clavicularHead]: 30,
      [mc.ids.chest.sternalHead]: 20,
      [mc.ids.shoulders.anteriorHead]: 25,
      [mc.ids.triceps.longHead]: 12.5,
      [mc.ids.triceps.shortHead]: 12.5,
      // stabilizers
      [mc.ids.forearms.flexors]: 7.5,
      [mc.ids.forearms.extensors]: 7.5,
    },
    info: {
      name: 'Incline Dumbbell Bench Press',
      group: 'Chest'
    }
  }),

  new Exercise({
    id: ids.chest.lowCableCrossover,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.chest.sternalHead]: 60,
      [mc.ids.shoulders.anteriorHead]: 20,
      [mc.ids.chest.clavicularHead]: 20
    },
    info: {
      name: 'Low Cable Crossover',
      group: 'Chest'
    }
  }),

  new Exercise({
    id: ids.chest.highCableCrossover,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.chest.clavicularHead]: 60,
      [mc.ids.shoulders.anteriorHead]: 25,
      [mc.ids.chest.sternalHead]: 15
    },
    info: {
      name: 'High Cable Crossover',
      group: 'Chest'
    }
  }),

  new Exercise({
    id: ids.chest.pecDeck,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.chest.clavicularHead]: 40,
      [mc.ids.shoulders.anteriorHead]: 20,
      [mc.ids.chest.sternalHead]: 40
    },
    info: {
      name: 'Pec Deck',
      group: 'Chest'
    }
  }),


  // Shoulders

  new Exercise({
    id: ids.shoulders.lateralRaise,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.shoulders.lateralHead]: 60,
      [mc.ids.shoulders.anteriorHead]: 15,
      [mc.ids.shoulders.posteriorHead]: 15,
      [mc.ids.back.upperTrapezius]: 10
    },
    info: {
      name: 'Lateral Raise',
      group: 'Shoulders'
    }
  }),

  new Exercise({
    id: ids.shoulders.dumbbellShoulderPress,
    type: types.compound,
    musclesUsed: {
      [mc.ids.shoulders.anteriorHead]: 32.5,
      [mc.ids.shoulders.lateralHead]: 32.5,
      [mc.ids.shoulders.posteriorHead]: 10,
      [mc.ids.triceps.longHead]: 12.5,
      [mc.ids.triceps.shortHead]: 12.5,
    },
    info: {
      name: 'Dumbbell Shoulder Press',
      group: 'Shoulders'
    }
  }),

  new Exercise({
    id: ids.shoulders.reversePecDeck,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.shoulders.posteriorHead]: 50,
      [mc.ids.back.middleBack]: 20,
      [mc.ids.back.upperTrapezius]: 15,
      [mc.ids.back.rotatorCuff]: 15
    },
    info: {
      name: 'Reverse Pec-Deck',
      group: 'Shoulders'
    }
  }),


  //Back

  new Exercise({
    id: ids.back.latPulldownWideGrip,
    type: types.compound,
    musclesUsed: {
      [mc.ids.back.lats]: 32.5,
      [mc.ids.back.middleBack]: 25,
      [mc.ids.back.rotatorCuff]: 15,
      [mc.ids.biceps.shortHead]: 10,
      [mc.ids.biceps.longHead]: 10,
      [mc.ids.triceps.longHead]: 7.5,
      // stabilizers
      [mc.ids.forearms.brachioradialis]: 10,
      [mc.ids.forearms.flexors]: 7.5,
    },
    info: {
      name: 'Wide Grip Lat Pulldown',
      group: 'Back'
    }
  }),

  new Exercise({
    id: ids.back.cableRow,
    type: types.compound,
    musclesUsed: {
      [mc.ids.back.middleBack]: 30,
      [mc.ids.back.lats]: 30,
      [mc.ids.back.rotatorCuff]: 10,
      [mc.ids.shoulders.posteriorHead]: 10,
      [mc.ids.biceps.shortHead]: 10,
      [mc.ids.biceps.longHead]: 10,
      // stabilizers
      [mc.ids.forearms.brachioradialis]: 10,
      [mc.ids.forearms.flexors]: 7.5,
    },
    info: {
      name: 'Cable Row',
      group: 'Back'
    }
  }),


  new Exercise({
    id: ids.back.dumbbellShrug,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.back.upperTrapezius]: 85,
      [mc.ids.back.middleBack]: 15,
      // stabilizer
      [mc.ids.forearms.flexors]: 15
    },
    info: {
      name: 'Dumbbell Shrugs',
      group: 'Back'
    }
  }),

  new Exercise({
    id: ids.back.cableExternalRotation,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.back.rotatorCuff]: 75,
      [mc.ids.shoulders.posteriorHead]: 25,
    },
    info: {
      name: 'Cable External Rotation',
      group: 'Back'
    }
  }),


  //Biceps

  new Exercise({
    id: ids.biceps.inclineDumbbellCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.biceps.longHead]: 45,
      [mc.ids.biceps.shortHead]: 37.5,
      [mc.ids.forearms.brachioradialis]: 17.5
    },
    info: {
      name: 'Incline Dumbbell Curl',
      group: 'Biceps'
    }
  }),

  new Exercise({
    id: ids.biceps.barbellCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.biceps.longHead]: 45,
      [mc.ids.biceps.shortHead]: 45,
      [mc.ids.forearms.brachioradialis]: 10,
      // stabilizer
      [mc.ids.forearms.flexors]: 7.5
    },
    info: {
      name: 'Barbell Curl',
      group: 'Biceps'
    }
  }),

  new Exercise({
    id: ids.biceps.preacherCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.biceps.shortHead]: 50,
      [mc.ids.biceps.longHead]: 40,
      [mc.ids.forearms.brachioradialis]: 10,
      // stabilizer
      [mc.ids.forearms.flexors]: 7.5
    },
    info: {
      name: 'Preacher Curl',
      group: 'Biceps'
    }
  }),

  new Exercise({
    id: ids.biceps.reverseGripCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.biceps.shortHead]: 35,
      [mc.ids.biceps.longHead]: 35,
      [mc.ids.forearms.brachioradialis]: 30,
      // stabilizer
      [mc.ids.forearms.extensors]: 10
    },
    info: {
      name: 'Reverse Grip Curl',
      group: 'Biceps'
    }
  }),


  // Forearms

  new Exercise({
    id: ids.forearms.wristCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.forearms.flexors]: 100
    },
    info: {
      name: 'Wrist Curl',
      group: 'Forearms'
    }
  }),

  new Exercise({
    id: ids.forearms.reverseWristCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.forearms.extensors]: 100
    },
    info: {
      name: 'Reverse Wrist Curl',
      group: 'Forearms'
    }
  }),


  //Triceps

  new Exercise({
    id: ids.triceps.seatedTricepsPress,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.triceps.longHead]: 60,
      [mc.ids.triceps.shortHead]: 40
    },
    info: {
      name: 'Seated Triceps Press',
      group: 'Triceps'
    }
  }),

  new Exercise({
    id: ids.triceps.tricepsPushdown,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.triceps.longHead]: 50,
      [mc.ids.triceps.shortHead]: 50,
      // stabilizer
      [mc.ids.forearms.extensors]: 10
    },
    info: {
      name: 'Triceps Pushdown',
      group: 'Triceps'
    }
  }),

  //Abs

  new Exercise({
    id: ids.core.crunches,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.core.abs]: 60,
      [mc.ids.core.obliques]: 40
    },
    info: {
      name: 'Crunch',
      group: 'Core'
    }
  }),

  new Exercise({
    id: ids.core.twistedCrunch,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.core.abs]: 40,
      [mc.ids.core.obliques]: 60
    },
    info: {
      name: 'Twisted Crunch',
      group: 'Core'
    }
  }),

  //Legs

  new Exercise({
    id: ids.legs.barbellSquat,
    type: types.compound,
    musclesUsed: {
      [mc.ids.legs.quadriceps]: 35,
      [mc.ids.legs.glutes]: 30,
      [mc.ids.legs.hamstrings]: 25,
      // stabilizer + some work
      [mc.ids.legs.calves]: 15,
    },
    info: {
      name: 'Barbell Squat',
      group: 'Legs'
    }
  }),

  new Exercise({
    id: ids.legs.hipThrust,
    type: types.compound,
    musclesUsed: {
      [mc.ids.legs.glutes]: 60,
      [mc.ids.legs.hamstrings]: 40,
    },
    info: {
      name: 'Hip Thrust',
      group: 'Legs'
    }
  }),

  new Exercise({
    id: ids.legs.legExtension,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.legs.quadriceps]: 100
    },
    info: {
      name: 'Leg Extension',
      group: 'Legs'
    }
  }),

  new Exercise({
    id: ids.legs.legCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.legs.hamstrings]: 60,
      [mc.ids.legs.glutes]: 25,
      [mc.ids.legs.calves]: 15,

    },
    info: {
      name: 'Leg Curl',
      group: 'Legs'
    }
  }),

  new Exercise({
    id: ids.legs.legPressCalfRaise,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.legs.calves]: 100
    },
    info: {
      name: 'Leg Press Calf Raise',
      group: 'Legs'
    }
  })
];


function get(id) {
  return _.find(exercises, (exercise) => {
    return exercise.id === id;
  });
}

module.exports = {
  ids, get, exercises
};
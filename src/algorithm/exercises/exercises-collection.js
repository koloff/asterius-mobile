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
      [mc.ids.chest.sternalHead]: 45,
      [mc.ids.chest.clavicularHead]: 15,
      [mc.ids.shoulders.anteriorHead]: 20,
      [mc.ids.triceps.longHead]: 10,
      [mc.ids.triceps.shortHead]: 10
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
      [mc.ids.chest.clavicularHead]: 40,
      [mc.ids.chest.sternalHead]: 20,
      [mc.ids.shoulders.anteriorHead]: 20,
      [mc.ids.triceps.longHead]: 10,
      [mc.ids.triceps.shortHead]: 10,
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
      [mc.ids.chest.sternalHead]: 70,
      [mc.ids.shoulders.anteriorHead]: 20,
      [mc.ids.chest.clavicularHead]: 10
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
      [mc.ids.chest.clavicularHead]: 65,
      [mc.ids.shoulders.anteriorHead]: 25,
      [mc.ids.chest.sternalHead]: 10
    },
    info: {
      name: 'High Cable Crossover',
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
      [mc.ids.shoulders.anteriorHead]: 35,
      [mc.ids.shoulders.lateralHead]: 35,
      [mc.ids.shoulders.posteriorHead]: 10,
      [mc.ids.triceps.longHead]: 10,
      [mc.ids.triceps.shortHead]: 10,
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
      [mc.ids.shoulders.posteriorHead]: 60,
      [mc.ids.back.upperTrapezius]: 20,
      [mc.ids.back.middleBack]: 20
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
      [mc.ids.back.lats]: 35,
      [mc.ids.back.middleBack]: 25,
      [mc.ids.back.rotatorCuff]: 15,
      [mc.ids.biceps.shortHead]: 12,
      [mc.ids.biceps.longHead]: 13,
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
      [mc.ids.back.middleBack]: 50,
      [mc.ids.back.lats]: 30,
      [mc.ids.shoulders.posteriorHead]: 5,
      [mc.ids.biceps.shortHead]: 5,
      [mc.ids.biceps.longHead]: 5,
      [mc.ids.forearms.brachioradialis]: 5,
      [mc.ids.forearms.flexors]: 5
    },
    info: {
      name: 'Cable Row',
      group: 'Back'
    }
  }),

  // new Exercise({
  //   id: ids.back.straightArmPulldown,
  //   type: types.isolation,
  //   musclesUsed: {
  //     [mc.ids.back.lats]: 60,
  //     [mc.ids.back.middleBack]: 20,
  //     [mc.ids.shoulders.posteriorHead]: 10,
  //     [mc.ids.triceps.longHead]: 10
  //   },
  //   info: {
  //     name: 'Straight Arm Pulldown',
  //     group: 'Back'
  //   }
  // }),

  new Exercise({
    id: ids.back.dumbbellShrug,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.back.upperTrapezius]: 80,
      [mc.ids.back.middleBack]: 10,
      [mc.ids.forearms.flexors]: 10
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
      [mc.ids.back.rotatorCuff]: 70,
      [mc.ids.shoulders.posteriorHead]: 20,
      [mc.ids.forearms.extensors]: 10
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
      [mc.ids.biceps.longHead]: 50,
      [mc.ids.biceps.shortHead]: 40,
      [mc.ids.forearms.flexors]: 5,
      [mc.ids.forearms.brachioradialis]: 5
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
      [mc.ids.forearms.flexors]: 5,
      [mc.ids.forearms.brachioradialis]: 5
    },
    info: {
      name: 'Barbell Curl',
      group: 'Biceps'
    }
  }),

  new Exercise({
    id: ids.biceps.overheadCableCurl,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.biceps.shortHead]: 50,
      [mc.ids.biceps.longHead]: 40,
      [mc.ids.forearms.flexors]: 5,
      [mc.ids.forearms.brachioradialis]: 5
    },
    info: {
      name: 'Overhead Cable Curl',
      group: 'Biceps'
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
    id: ids.triceps.ropePushdown,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.triceps.longHead]: 50,
      [mc.ids.triceps.shortHead]: 50
    },
    info: {
      name: 'Rope Pushdown',
      group: 'Triceps'
    }
  }),

  new Exercise({
    id: ids.triceps.skullCrushers,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.triceps.longHead]: 60,
      [mc.ids.triceps.shortHead]: 40
    },
    info: {
      name: 'Skull Crusher',
      group: 'Triceps'
    }
  }),


  //Abs

  new Exercise({
    id: ids.core.crunches,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.core.abs]: 70,
      [mc.ids.core.obliques]: 30
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
      [mc.ids.core.abs]: 55,
      [mc.ids.core.obliques]: 45
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
      [mc.ids.legs.hamstrings]: 15,
      [mc.ids.legs.glutes]: 30,
      [mc.ids.legs.calves]: 10,
      [mc.ids.legs.hamstrings]: 10
    },
    info: {
      name: 'Barbell Squat',
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
      [mc.ids.legs.hamstrings]: 75,
      [mc.ids.legs.glutes]: 25
    },
    info: {
      name: 'Leg Curl',
      group: 'Legs'
    }
  }),

  new Exercise({
    id: ids.legs.smithMachineCalfRaise,
    type: types.isolation,
    musclesUsed: {
      [mc.ids.legs.calves]: 100
    },
    info: {
      name: 'Smith Machine Calf Raise',
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
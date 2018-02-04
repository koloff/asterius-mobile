let _ = require('lodash');
let Muscle = require('./muscle');
let ids = require('./muscles-ids');


let types = {
  upperBody: 'upperBody',
  lowerBody: 'lowerBody',
  push: 'push',
  pull: 'pull',
  other: 'other'
};

// mev - minimum effective volume for 1 session
// mrv - minimum recoverable volume for 1 session
let muscles = [
  new Muscle({
    id: ids.shoulders.anteriorHead,
    mev: 1,
    mrv: 5,
    types: [types.upperBody, types.push],
    info: {
      group: 'Shoulders',
      name: 'Deltoid Anterior Head',
      broName: 'Front Delts',
      color: '#ffae00'
    }
  }),
  new Muscle({
    id: ids.shoulders.lateralHead,
    mev: 1,
    mrv: 5,
    types: [types.upperBody, types.push],
    info: {
      group: 'Shoulders',
      name: 'Deltoid Lateral Head',
      broName: 'Side Delts',
      color: '#ffcf02'
    }
  }),
  new Muscle({
    id: ids.shoulders.posteriorHead,
    mev: 1,
    mrv: 5,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Shoulders',
      name: 'Deltoid Posterior Head',
      broName: 'Rear Delts',
      color: '#ff6c06'
    }
  }),
  new Muscle({
    id: ids.chest.clavicularHead,
    mev: 2,
    mrv: 6,
    types: [types.upperBody, types.push],
    info: {
      group: 'Chest',
      name: 'Pectoralis Major Clavicular Head',
      broName: 'Upper Chest',
      color: '#0095ff'
    }
  }),
  new Muscle({
    id: ids.chest.sternalHead,
    mev: 2,
    mrv: 6,
    types: [types.upperBody, types.push],
    info: {
      group: 'Chest',
      name: 'Pectoralis Major Sternal Head',
      broName: 'Lower Chest',
      color: '#0028ff'
    }
  }),
  new Muscle({
    id: ids.back.upperTrapezius,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Trapezius Superior Fibers',
      broName: 'Upper Traps',
      color: '#00ff46'
    }
  }),
  new Muscle({
    id: ids.back.middleBack,
    mev: 1.5,
    mrv: 6,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Trapezius Inferior Fibers, Rhomboid',
      broName: 'Middle Back',
      color: '#37ff00'
    }
  }),
  new Muscle({
    id: ids.back.lats,
    mev: 1.5,
    mrv: 6,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Latissimus Dorsi',
      broName: 'Lats',
      color: '#ffd200'
    }
  }),
  new Muscle({
    id: ids.back.rotatorCuff,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Back',
      name: 'Teres Minor, Infraspinatus, Supraspinatus, Subscapularis',
      broName: 'Rotator Cuff',
      color: '#ff9200'
    }
  }),
  new Muscle({
    id: ids.biceps.longHead,
    mev: 1,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Biceps',
      name: 'Biceps Brachii Long Head',
      broName: 'Outer Biceps',
      color: '#9aff6e'
    }
  }),
  new Muscle({
    id: ids.biceps.shortHead,
    mev: 0.8,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Biceps',
      name: 'Biceps Brachii Short Head',
      broName: 'Inner Biceps',
      color: '#ff44e3'
    }
  }),
  new Muscle({
    id: ids.triceps.longHead,
    mev: 1,
    mrv: 6,
    types: [types.upperBody, types.push],
    info: {
      group: 'Triceps',
      name: 'Triceps Brachii Long Head',
      broName: 'Inner Triceps',
      color: '#e500ff'
    }
  }),
  new Muscle({
    id: ids.triceps.shortHead,
    mev: 0.7,
    mrv: 5,
    types: [types.upperBody, types.push],
    info: {
      group: 'Triceps',
      name: 'Triceps Brachii Lateral Head',
      broName: 'Outer Triceps',
      color: '#c100ff'
    }
  }),
  new Muscle({
    id: ids.forearms.brachioradialis,
    mev: 0.7,
    mrv: 4,
    types: [types.upperBody, types.pull],
    info: {
      group: 'Forearms',
      name: 'Brachioradialis',
      broName: 'Brachioradialis',
      color: '#0026ff'
    }
  }),
  new Muscle({
    id: ids.forearms.flexors,
    mev: 0.3,
    mrv: 3,
    types: [types.upperBody, types.other],
    info: {
      group: 'Forearms',
      name: 'Flexors Group',
      broName: 'Flexors',
      color: '#006cff'
    }
  }),
  new Muscle({
    id: ids.forearms.extensors,
    mev: 0.3,
    mrv: 3,
    types: [types.upperBody, types.other],
    info: {
      group: 'Forearms',
      name: 'Extensors Group',
      broName: 'Extensors',
      color: '#00b8ff'
    }
  }),
  new Muscle({
    id: ids.core.abs,
    mev: 1.3,
    mrv: 4,
    types: [types.other],
    info: {
      group: 'Core',
      name: 'Rectus Abdominis',
      broName: 'Abs',
      color: '#ff7609'
    }
  }),
  new Muscle({
    id: ids.core.obliques,
    mev: 0.7,
    mrv: 4,
    types: [types.other],
    info: {
      group: 'Core',
      name: 'Abdominal Obliques',
      broName: 'Obliques',
      color: '#08ff0f'
    }
  }),
  new Muscle({
    id: ids.legs.quadriceps,
    mev: 1.5,
    mrv: 7,
    types: [types.lowerBody],
    info: {
      group: 'Legs',
      name: 'Quadriceps Group',
      broName: 'Quads',
      color: '#00ffab'
    }
  }),
  new Muscle({
    id: ids.legs.hamstrings,
    mev: 1.5,
    mrv: 7,
    types: [types.lowerBody],
    info: {
      group: 'Legs',
      name: 'Hamstrings Group',
      broName: 'Hamstrings',
      color: '#28ff7b'
    }
  }),
  new Muscle({
    id: ids.legs.glutes,
    mev: 1,
    mrv: 7,
    types: [types.lowerBody],
    info: {
      group: 'Legs',
      name: 'Gluteus Group',
      broName: 'Glutes',
      color: '#55ff00'
    }
  }),
  new Muscle({
    id: ids.legs.calves,
    mev: 0.5,
    mrv: 5,
    types: [types.lowerBody, types.other],
    info: {
      group: 'Legs',
      name: 'Soleus, Gastrocnemius',
      broName: 'Calves',
      color: '#b5ff00'
    }
  }),

];

function get(id) {
  return _.find(muscles, function(muscle) {
    return muscle.id === id;
  });
}

// let sum = 0;
// muscles.forEach((muscle) => {
//   sum+=muscle.mev
// });
// console.log(sum);


module.exports = {
  ids, muscles, get
};
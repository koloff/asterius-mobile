let ids = require('./muscles/muscles-ids');

module.exports = {
  fullBody: [
    ids.chest.clavicularHead,
    ids.chest.sternalHead,

    ids.shoulders.lateralHead,
    ids.shoulders.anteriorHead,
    ids.shoulders.posteriorHead,

    ids.back.lats,
    ids.back.middleBack,

    ids.triceps.longHead,
    ids.triceps.shortHead,

    ids.biceps.longHead,
    ids.biceps.shortHead,

    ids.legs.quadriceps,
    ids.legs.hamstrings,
    ids.legs.glutes
  ],

  upperBody: [
    ids.chest.clavicularHead,
    ids.chest.sternalHead,

    ids.shoulders.lateralHead,
    ids.shoulders.anteriorHead,
    ids.shoulders.posteriorHead,

    ids.back.lats,
    ids.back.middleBack,
    ids.back.rotatorCuff,

    ids.biceps.longHead,
    ids.biceps.shortHead,

    ids.triceps.longHead,
    ids.triceps.shortHead,
  ],

  lowerBody: [
    ids.legs.quadriceps,
    ids.legs.hamstrings,
    ids.legs.glutes,
    ids.legs.calves,

    ids.core.abs,
    ids.core.obliques,
  ],


  push: [
    ids.chest.clavicularHead,
    ids.chest.sternalHead,

    ids.shoulders.lateralHead,
    ids.shoulders.anteriorHead,
    ids.shoulders.posteriorHead,

    ids.triceps.longHead,
    ids.triceps.shortHead,
  ],

  pull: [
    ids.back.lats,
    ids.back.middleBack,
    ids.back.rotatorCuff,
    ids.back.upperTrapezius,

    ids.biceps.longHead,
    ids.biceps.shortHead,
    // todo: add exercises and edit volume
    // mc.keys.forearms.brachioradialis,
    // mc.keys.forearms.extensors,
    // mc.keys.forearms.flexors
  ]


};
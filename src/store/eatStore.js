import {computed} from 'mobx';
import userParametersStore from "./userParametersStore";


class EatStore {
  @computed get kg() {
    let {weight, measuringUnit} = userParametersStore.parameters;
    if (measuringUnit === 1) {
      return weight;
    }
    return weight / 2.20462;
  }

  @computed get cm() {
    let {height, measuringUnit} = userParametersStore.parameters;
    if (measuringUnit === 1) {
      return height;
    }
    return height / 2.54;
  }

  @computed get calories() {
    let {gender, age, activity, goal} = userParametersStore.parameters;

    // The Mifflin St Jeor Equation for BMR
    let s = gender === 1 ? +5 : -161;
    let bmr = (10 * this.kg) + (6.25 * this.cm) - (5 * age) + s;

    let tdeeMultiplier;
    switch (activity) {
      case 1:
        tdeeMultiplier = 1.2;
        break;
      case 2:
        tdeeMultiplier = 1.375;
        break;
      case 3:
        tdeeMultiplier = 1.55;
        break;
      case 4:
        tdeeMultiplier = 1.725;
        break;
      case 5:
        tdeeMultiplier = 1.9;
        break;
    }

    let tdee = bmr * tdeeMultiplier;

    let caloricMultiplier;
    switch (goal) {
      case 1:
        caloricMultiplier = 0.8;
        break;
      case 2:
        caloricMultiplier = 0.9;
        break;
      case 3:
        caloricMultiplier = 1;
        break;
      case 4:
        caloricMultiplier = 1.1;
        break;
      case 5:
        caloricMultiplier = 1.2;
        break;
    }

    return Math.round(tdee * caloricMultiplier);
  }

  @computed get macrosChartData() {
    let {goal} = userParametersStore.parameters;

    let proteinMultiplier;
    switch (goal) {
      case 1:
        proteinMultiplier = 2.3;
        break;
      case 2:
        proteinMultiplier = 2.2;
        break;
      case 3:
        proteinMultiplier = 2.1;
        break;
      case 4:
        proteinMultiplier = 2;
        break;
      case 5:
        proteinMultiplier = 1.9;
        break;
    }

    let proteins = this.kg * proteinMultiplier;
    let proteinsPercentage = (proteins * 4) / this.calories;
    let fatsPercentage = 0.3;
    let fats = (fatsPercentage * this.calories) / 9;
    let carbohydratesPercentage = 1 - (proteinsPercentage + fatsPercentage);
    let carbohydrates = (this.calories * carbohydratesPercentage) / 4;

    let res = [{
      type: 'Proteins',
      key: 'Proteins',
      value: proteinsPercentage,
      grams: Math.round(proteins),
      svg: {fill: '#EF6C00'}
    }, {
      type: 'Fats',
      key: 'Fats',
      value: fatsPercentage,
      grams: Math.round(fats),
      svg: {fill: '#2196F3'}
    }, {
      type: 'Carbs',
      key: 'Carbs',
      value: carbohydratesPercentage,
      grams: Math.round(carbohydrates),
      svg: {fill: '#909779'}
    }];

    return res;
  }

}


export default new EatStore();
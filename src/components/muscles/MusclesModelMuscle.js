import React from 'react';
import {Polygon} from 'react-native-svg';
import {observer} from 'mobx-react';

// props: pointStr, percentage, isSelected
@observer
export default class MusclesModelMuscle extends React.Component {
  constructor(props) {
    super(props);
    this.hasStore = !!this.props.musclesModelMuscleStore;
  }

  getMuscleColor(percentage) {
    let alpha = percentage / 100;
    return `rgba(33,150,243, ${alpha})`;
  }

  render() {
    return (
      <Polygon
        points={this.props.pointsStr}
        fill={this.getMuscleColor(this.hasStore ? this.props.musclesModelMuscleStore.percentage : 0)}
        stroke={this.hasStore ? (this.props.musclesModelMuscleStore.selected ? 'rgba(255,143,0 ,1)' : 'white') : 'white'}
        strokeWidth={this.hasStore ? (this.props.musclesModelMuscleStore.selected ? 3 : 1) : 1}
        strokeOpacity={this.hasStore ? (this.props.musclesModelMuscleStore.selected ? 1 : 0.7) : 0.7}
      />
    )
  }
}
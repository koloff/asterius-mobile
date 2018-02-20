import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import exercisesLogsStore from "../../store/exercisesLogsStore";

@observer
export default class ExerciseLogsGraphic extends React.Component {
  HEIGHT = 200;
  state = {
    loading: true
  };

  async componentWillMount() {
    this.id = this.props.id;
    this.exerciseLogsStore = exercisesLogsStore.getExerciseLogs(this.id);
    await this.exerciseLogsStore.loadLogs();
    this.setState({loading: false})
  }

  @observer
  render() {
    return (
      <View>
        {!this.state.loading && <View style={{height: this.HEIGHT, backgroundColor: '#333'}}>
          {this.exerciseLogsStore.exerciseLogs.entries().map((dateStr, logStore) => {
            console.log(logStore);
            return (<View key={dateStr}>
              <Text style={{color: '#fff'}}>dsadsadsa{logStore.dateStr}</Text>
            </View>)
          })}
        </View>}
      </View>
    )
  }

}
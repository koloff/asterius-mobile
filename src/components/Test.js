import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import _ from 'lodash';
import RadioButtons from './RadioButtons';
import {gs} from "../globals";
import database from "../database";



@observer
export default class Container extends React.Component {


  state = {
    reps: [1, 2, 3, 4, 5, 6]
  };

  @observable a = [];

  async addRep() {
    let i = 0;
    while (i < 5) {
      await database.get('exercisesLogs/kuNqehWHwMaKf0MTUITum0bKoeu1/smithMachineCalfRaise');
      this.a.push(1);
      i++
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={(th) => {
            this.addRep()
          }}>
          <Text style={[gs.text]}>GOO</Text>
        </TouchableOpacity>

        {this.a.map((i, index) => {
          return <A key={index}/>
        })}

      </View>
    );
  }
}

@observer
class A extends React.Component {
  state ={
    logLoaded: true
  };

  async componentDidMount() {
    this.setState({logLoaded: true})
  }

  render() {
    return (<View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
      <View><View><Text>{this.state.logLoaded ? 'Loaded' : ''}</Text></View></View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010'
  }
});

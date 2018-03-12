import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Animated, TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from "react-navigation";

import {gs} from "../../globals";
import tweakerStore from "../../store/tweakerStore";
import moment from "moment/moment";

@withNavigation
@observer
export default class ExerciseDetails extends Component {


  componentDidMount() {

  }

  @observer
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#101010'}}>
        <View style={{
          // borderBottomWidth: 1,
          // borderBottomColor: '#222',
          flexDirection: 'row',
          width: '100%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 1, padding: 10, paddingBottom: 7, paddingRight: 21}}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
          </TouchableOpacity>

          <View style={{alignItems: 'center'}}>
            <Text style={[gs.text, {
              fontSize: 19,
              padding: 10,
              textAlign: 'center'
            }]}>Dumbbell Bench Press</Text>
          </View>
        </View>
      </View>
    );

  }
}

import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList, Image} from 'react-native';

import {gs} from "../../globals";
import ElevatedView from "../ElevatedView";
import Generate from './Generate';

@observer
export default class GenerateStack extends React.Component {


  render() {
    return (
      <View style={{flex: 1}}>

        <Image
          source={require('../../assets/logo.png')}
          style={[{
            width: 620,
            height: 72,
            transform: [{scale: 0.33}, {translateY: 21}],
            opacity: 0.7,
            position: 'relative',
            alignSelf: 'center',
            zIndex: 500
          }]}/>
        <Generate/>
      </View>
    )
  }
}

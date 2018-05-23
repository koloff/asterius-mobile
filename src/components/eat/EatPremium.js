import {gs} from "../../globals";
import * as React from "react";
import {observer} from 'mobx-react';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity, Text, View} from "react-native";
import {BlurView} from "react-native-blur";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ElevatedView from "../ElevatedView";
import FontAwesome from "react-native-vector-icons/FontAwesome";


@observer
@withNavigation
export default class EatPremium extends React.Component {
  render() {
    return <View style={{
      position: "absolute",
      top: 0, left: 0, bottom: 0, right: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <BlurView
        style={{
          position: "absolute",
          top: 0, left: 0, bottom: 0, right: 0,
        }}
        blurType="dark"
        blurAmount={10}
      />
      <MaterialCommunityIcons name={'food-fork-drink'} color={'#fff'} size={55} style={{marginBottom: 0}}/>
      <Text style={[gs.text, gs.shadow, {textAlign: 'center', fontSize: 25, color: '#ddd'}]}>
        Nutrition{'\n'}
        <Text style={{fontSize: 15}}>This is premium feature</Text>
      </Text>

      <TouchableOpacity
        style={{
          borderRadius: 5,
          paddingLeft: 20,
          paddingRight: 20
        }}
        onPress={() => {
          this.props.navigation.navigate('PremiumScreen');
        }}>
        <ElevatedView elevation={3} style={{
          marginTop: 20,
          padding: 6,
          borderRadius: 5,
          width: 180,
          backgroundColor: 'rgba(245,127,23 , 1)'
        }}>
          <Text style={[gs.text, {
            fontSize: 23,
            textAlign: 'center',
            textShadowColor: 'rgba(0,0,0,0.5)',
            textShadowRadius: 7,
            textShadowOffset: {width: 1, height: 1}
          }]}>
            <FontAwesome size={23} name={'star'}/>
            &nbsp; Next level
          </Text>
        </ElevatedView>
      </TouchableOpacity>

    </View>
  }
}
import {gs} from "../../globals";
import * as React from "react";
import {observer} from 'mobx-react';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity, Text, View, findNodeHandle} from "react-native";
import {BlurView} from "react-native-blur";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ElevatedView from "../ElevatedView";
import FontAwesome from "react-native-vector-icons/FontAwesome";


@observer
@withNavigation
export default class WeightPremium extends React.Component {

  state = {
    blurRef: null
  };

  onBlurRef(ref) {
    this.setState({blurRef: ref})
  }

  render() {
    return <View style={{
      position: 'absolute',
      width: '100%',
      height: '100%', top: 0, left: 0, bottom: 0, right: 0,
    }}>

      <View
        ref={(ref) => {
          this.blurRef = ref;
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%', top: 0, left: 0, bottom: 0, right: 0,
          backgroundColor: 'rgba(0,0,0,0.9)'
        }}></View>

      {this.blurRef && <BlurView
        style={{
          width: '100%', height: '100%',
          position: "absolute",
          top: 0, left: 0, bottom: 0, right: 0,
          zIndex: 999
        }}
        viewRef={this.blurRef}
        blurType="dark"
        blurRadius={5}
        blurAmount={5}
      />}

      <View
        style={{
          width: '100%',
          height: '100%', top: 0, left: 0, bottom: 0, right: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        ref={(ref) => {
          this.ref = ref;
        }}
      >
        <MaterialCommunityIcons name={'scale-bathroom'} color={'#fff'} size={55} style={{marginBottom: 0}}/>
        <Text style={[gs.text, gs.shadow, {textAlign: 'center', fontSize: 25, color: '#ddd'}]}>
          Weight{'\n'}
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
              &nbsp; Get it
            </Text>
          </ElevatedView>
        </TouchableOpacity>
      </View>

    </View>
  }
}
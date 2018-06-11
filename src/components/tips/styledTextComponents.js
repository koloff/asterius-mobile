import {gs} from "../../globals";
import * as React from "react";
import {Text, View} from "react-native";
import Feather from "react-native-vector-icons/Feather";

export class Box extends React.Component {
  render() {
    return <View
      style={{
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fff'
      }}>
      {this.props.children}
    </View>
  }
}

export class Title extends React.Component {
  render() {
    return <Text
      style={[gs.longText, {
        color: '#333',
        fontSize: 21,
        textAlign: 'center',
        marginBottom: 5
      }]}>
      {this.props.children}
    </Text>
  }
}

export class P extends React.Component {
  render() {
    return <Text
      style={[gs.longText, {
        fontSize: 12,
        color: '#333',
        marginTop: 6
      }]}>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.children}
    </Text>
  }
}

export class B extends React.Component {
  render() {
    return <Text style={[gs.longTextBold]}>{this.props.children}</Text>
  };
}

export class Li extends React.Component {
  render() {
    return <View style={{flexDirection: 'row', paddingRight: 3, paddingTop: 2, paddingLeft: 0}}>
      <Feather size={12} name={'check-circle'} style={{top: 3, marginRight: 4}}/>
      <Text
        style={[gs.longText, {
          color: '#333',
          fontSize: 12,
        }]}>
        {this.props.children}
      </Text>
    </View>
  }
}

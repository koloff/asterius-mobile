import {gs} from "../../globals";
import * as React from "react";
import {TouchableOpacity, Button, View, Dimensions} from "react-native";
import Interactable from 'react-native-interactable';

function getPoints(length, count, windowWidth, windowHeight) {
  let arr = [];
  let mult = 0;
  for (let i = 0; i < count; i++) {
    arr.push({x: 0, y: windowHeight * mult});
    mult += 1 / count;
  }
  mult = 0;
  for (let i = 0; i < count; i++) {
    arr.push({x: windowWidth - length, y: windowHeight * mult});
    mult += 1 / count;
  }
  return arr;
}

export default class TipsCircle extends React.Component {


  render() {
    const size = 70;
    let {height, width} = Dimensions.get('window');
    console.log(height, width);

    return <Interactable.View
      style={{
        position: 'absolute',
        width: size, height: size,
        backgroundColor: 'blue'
      }}
      boundaries={{
        // left: -width/2, right: width/2,
        // top: -height/2, bottom: height/2
      }}
      snapPoints={getPoints(size, 20, width, height)}>
      <View style={{width: size, height: size, backgroundColor: 'red', borderRadius: size/2}}>
        <Button title={"te"} onPress={() => {
        }}/>
      </View>
    </Interactable.View>
  }
}
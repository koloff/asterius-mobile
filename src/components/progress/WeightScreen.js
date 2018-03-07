import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import {gs} from "../../globals";
import {Defs, LinearGradient, Stop} from 'react-native-svg'
import {LineChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Ionicons from "react-native-vector-icons/Ionicons";
import weightLogsStore from '../../store/weightLogsStore';
import moment from "moment";

@observer
export default class ProgressScreen extends React.Component {

  state = {
    // loading: true,
    value: ''
  };


  componentDidMount() {
    weightLogsStore.init();
  }


  render() {
    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'#FF7043'}/>
          <Stop offset={'100%'} stopColor={'#F57C00'}/>
        </LinearGradient>
      </Defs>
    );

    return (<View>

        <LineChart
          style={{
            height: 200,
            justifyContent: 'center'
          }}
          data={weightLogsStore.graphData}
          contentInset={{top: 20, bottom: 20}}
          showGrid={false}
          svg={{
            strokeWidth: 4,
            stroke: 'url(#gradient)',
          }}
          curve={shape.curveNatural}
          extras={[Gradient]}
        />

        {/*<Text style={[gs.text, gs.shadow, {*/}
        {/*textAlign: 'center',*/}
        {/*color: '#F57C00',*/}
        {/*fontSize: 17,*/}
        {/*}]}>Your weight</Text>*/}

        <View style={{
          // flex: 1,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          flexDirection: 'row'
        }}>
          <TextInput
            keyboardType={'numeric'}
            underlineColorAndroid={'transparent'}
            placeholder={'WEIGHT'}
            placeholderTextColor={'#F57C00'}
            selectionColor={'#F57C00'}
            value={isNaN(this.state.value) ? '' : this.state.value.toString()}
            onChangeText={(val) => {
              this.setState({value: val});
            }}
            style={[gs.shadow, {
              width: 150,
              height: 50,
              borderWidth: 1,
              borderColor: '#F57C00',
              color: '#F57C00',
              // backgroundColor: 'rgba(51, 51, 51, 0.4)',
              fontSize: 19,
              fontFamily: 'Montserrat',
              margin: 3,
              textAlign: 'center',
              borderRadius: 3,
            }]}/>
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10
            }}
            onPress={() => {
              weightLogsStore.addLog(this.state.value);
            }}
          >
            <Ionicons color={'#F57C00'} name={'md-add'} size={37}/>
          </TouchableOpacity>
        </View>

        <Text style={[gs.text]}>{weightLogsStore.logs.length}</Text>

        <ScrollView style={{backgroundColor: 'red'}}
                    contentContainerStyle={{
                      // paddingBottom: 5,
                      flexGrow: 1,
                      // backgroundColor: 'red',
                      justifyContent: 'center'
                    }}>

          {weightLogsStore.logs.map((log, index) => {
              return <View key={index}>
                <Text style={[gs.text]}>{moment(log.time).format('D MMM YYYY')}sa das a </Text>
              </View>
            }
          )}

        </ScrollView>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});
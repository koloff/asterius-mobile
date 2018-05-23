import React from 'react';
import {observer} from 'mobx-react';
import {Text, View, Image, StyleSheet, TouchableOpacity, Animated, ActivityIndicator} from 'react-native';
import {gs} from '../../globals';
import Swiper from 'react-native-swiper';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import subscriptionStore from '../../store/subscriptionsStore';
import Toast from "react-native-root-toast";
import connectionStore from "../../store/connectionStore";

@observer
export default class PremiumScreen extends React.Component {

  state = {
    loadingPrices: true,
    animation: new Animated.Value(0)
  };


  async componentDidMount() {
    try {
      await subscriptionStore.getPrices();
      this.setState({loadingPrices: false});
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500
      }).start();


    } catch (err) {
      console.log(err);
      let toast = Toast.show('This device is not allowed to make purchases. Please check restrictions!', {
        shadow: true,
        duration: 3000,
        position: -10,
        backgroundColor: 'orange'
      });
    }
  }


  render() {
    return <View style={{flex: 1}}>
      <Image
        style={{
          flex: 1,
          resizeMode: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        source={require('../../assets/bg1.jpg')}
      />

      <View style={[{
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }]}>
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity
            style={{
              padding: 10, paddingBottom: 7, paddingRight: 21
            }}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={[gs.text, {
            fontSize: 21,
            padding: 10,
            textAlign: 'center'
          }]}>Asterius Premium</Text>
        </View>
      </View>

      <Swiper
        containerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: '#fff'
        }}
        loop={false}
        showsButtons={false}
        autoplayDirection={false}
        paginationStyle={{
          marginBottom: -5
        }}
        dot={<View style={{
          backgroundColor: '#555',
          width: 10,
          height: 10,
          borderRadius: 4,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 3,
          marginBottom: 3,
        }}/>}
        activeDot={<View style={{
          backgroundColor: '#FF8F00',
          width: 10,
          height: 10,
          borderRadius: 4,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 3,
          marginBottom: 3,
        }}/>}>


        <View style={[styles.slide, {top: -20}]}>


          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                resizeMode={'stretch'}
                style={{
                  top: 30,
                  left: 22,
                  width: 160,
                  height: 220,
                  borderColor: '#444',
                  borderWidth: StyleSheet.hairlineWidth
                }}
                source={require('../../assets/eatscreen.png')}
              />

            </View>
            <View style={{flex: 1, paddingLeft: 35, paddingTop: 70}}>
              <Text style={[gs.text, gs.shadow, {fontSize: 15, textAlign: 'left', color: '#ddd'}]}>Nutrition guidance
                adapted to your{'\n'}fitness goals{'\n'}and lifestyle.</Text>
            </View>
          </View>


          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, paddingRight: 35, paddingTop: 80}}>
              <Text style={[gs.text, gs.shadow, {fontSize: 15, textAlign: 'right', color: '#ddd', marginTop: 7}]}>
                Weight logging{'\n'}that regulates{'\n'}the nutrition.
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Image
                resizeMode={'stretch'}
                style={{
                  top: -30,
                  left: -22,
                  width: 160,
                  height: 220,
                  borderColor: '#444',
                  borderWidth: StyleSheet.hairlineWidth
                }}
                source={require('../../assets/weightlogs.png')}
              />
            </View>
          </View>

        </View>

        <View style={styles.slide}>
          <MaterialCommunityIcons name={'dumbbell'} color={'#fff'} size={55} style={{marginBottom: 10}}/>
          <Text style={[gs.text, gs.shadow, {textAlign: 'center', fontSize: 25, color: '#ddd'}]}>
            <Text style={{fontSize: 25}}>Access to</Text>{'\n'}
            <Text style={{fontSize: 49}}>100+</Text>{'\n'}
            exercises{'\n'}{'\n'}
            <Text style={{fontSize: 15}}>Design your body with all sorts{'\n'}of equipment in every gym!</Text>
          </Text>

        </View>

        <View style={styles.slide}>
          <Entypo name={'emoji-happy'} color={'#fff'} size={55} style={{marginBottom: 10}}/>
          <Text style={[gs.text, gs.shadow, {textAlign: 'center', fontSize: 25, color: '#ddd'}]}>
            Remove all ads{'\n'}
            <Text style={{fontSize: 15}}>No more interruptions,{'\n'}go straight to your dream body!</Text>
          </Text>
        </View>

        <View style={styles.slide}>
          <Entypo name={'chat'} color={'#fff'} size={55} style={{marginBottom: 10}}/>
          <Text style={[gs.text, gs.shadow, {textAlign: 'center', fontSize: 25, color: '#ddd'}]}>
            Email support{'\n'}
            <Text style={{fontSize: 15}}>We will answer your questions{'\n'}and listen to your feature requests</Text>
          </Text>
        </View>

        <View style={styles.slide}>
          <Entypo name={'network'} color={'#fff'} size={55} style={{marginBottom: 10}}/>
          <Text style={[gs.text, gs.shadow, {textAlign: 'center', fontSize: 25, color: '#ddd'}]}>
            Use offline{'\n'}
            <Text style={{fontSize: 15}}>Use Asterius everywhere anytime.{'\n'}When you come online the data{'\n'}will
              be synced to our servers.</Text>
          </Text>
        </View>
      </Swiper>

      {!connectionStore.connected || subscriptionStore.isSubscribed ?
        <View
          style={{
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[gs.text, gs.shadow, {color: '#F57C00'}]}>
            {subscriptionStore.isSubscribed ? 'You are premium!' : 'Connect to the internet to subscribe.'}
          </Text>
        </View>

        : <View>
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              bottom: 0,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}>
            <ActivityIndicator size={'large'} color={'orange'}/>
          </Animated.View>

          <Animated.View style={{
            opacity: this.state.animation,
            flexDirection: 'row',
            paddingBottom: 10
          }}>
            <View style={{
              flex: 1,
              alignItems: 'flex-end'
            }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 100,
                  borderColor: '#FFA000',
                  borderWidth: 1,
                  borderRadius: 15,
                  margin: 10,
                  marginTop: 0,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                  subscriptionStore.subscribe('month');
                }}
              >
                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 7, marginBottom: 3}}>
                  <Text style={[gs.text, {
                    fontSize: 25,
                    lineHeight: 30
                  }]}>{subscriptionStore.monthlyPrice.toString().split('.')[0]}</Text>
                  <Text style={[gs.text, {
                    fontSize: 14,
                    lineHeight: 21
                  }]}>{subscriptionStore.monthlyPrice.toString().split('.')[1]} {subscriptionStore.currencySymbol}</Text>
                </View>
                <View>
                  <Text style={[gs.text, {fontSize: 12}]}>Monthly</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{
              flex: 1,
              alignItems: 'flex-start'
            }}>
              <TouchableOpacity style={{
                width: 100,
                height: 100,
                borderColor: '#FFA000',
                borderWidth: 1,
                borderRadius: 15,
                margin: 10,
                marginTop: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <View style={{position: 'absolute', top: 5}}>
                  <Text style={[gs.text, {fontSize: 14, color: '#FFA000'}]}>SAVE 50%</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 7, marginBottom: 3}}>
                  <Text style={[gs.text, {
                    fontSize: 25,
                    lineHeight: 30
                  }]}>{subscriptionStore.yearlyPrice.toString().split('.')[0]}</Text>
                  <Text style={[gs.text, {
                    fontSize: 14,
                    lineHeight: 21
                  }]}>{subscriptionStore.yearlyPrice.toString().split('.')[1]} {subscriptionStore.currencySymbol}</Text>
                </View>
                <View>
                  <Text style={[gs.text, {fontSize: 12}]}>Once a year</Text>
                </View>
              </TouchableOpacity>

            </View>
          </Animated.View>

        </View>
      }


    </View>
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  }
});
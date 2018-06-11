import {View, Modal, TouchableWithoutFeedback, Text} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {gs} from "../globals";

@observer
export default class DarkModal extends React.Component {


  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        transparent={true}
        animationType={this.props.animationType || 'fade'}
        onRequestClose={() => {
          console.log('closing');
          if (this.props.onModalClose) {
            this.props.onModalClose();
          }
        }}>
        <View style={{
          flex: 1,
          // backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center'
        }}>


          <TouchableWithoutFeedback
            style={{
              position: 'absolute'
            }}
            onPress={() => {
              if (this.props.onModalClose) {
                this.props.onModalClose();
              }
            }}
          ><View style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '100%',
            height: '100%',
          }}>
            <Text style={[gs.text, {
              width: '100%',
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: 20,
              color: '#777',
              fontSize: 12,
              textAlign: 'center'
            }]}>
             PRESS TO HIDE
            </Text>
          </View>


          </TouchableWithoutFeedback>


          {this.props.children}


        </View>
      </Modal>
    )
  }
}
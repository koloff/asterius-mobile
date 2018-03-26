import {View, Modal, TouchableWithoutFeedback} from 'react-native';
import React from 'react';

export default class DarkModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          this.props.onModalClose();
        }}>
        <TouchableWithoutFeedback
          style={{
            flex: 1
          }}
          onPress={() => {
            this.props.onModalClose();
          }}>
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.95)',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {this.props.children}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}
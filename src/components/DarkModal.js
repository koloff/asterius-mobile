import {View, Modal, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class DarkModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() => {
          if (this.props.onModalClose) {
            this.props.onModalClose();
          }
        }}>
        <TouchableWithoutFeedback
          style={{
            flex: 1
          }}
          onPress={() => {
            if (this.props.onModalClose) {
              this.props.onModalClose();
            }
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
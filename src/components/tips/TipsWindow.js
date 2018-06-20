import * as React from "react";
import {StyleSheet, Text, Dimensions, ScrollView} from "react-native";
import {observer} from 'mobx-react';
import DarkModal from "../DarkModal";
import {reaction} from 'mobx';
import tipsStore from '../../store/tipsStore';


@observer
export default class TipsWindow extends React.Component {
  closeModal() {
    tipsStore.closeTipsModal();
  }

  render() {

    const {height, width} = Dimensions.get('window');
    return <DarkModal
      animationType={'slide'}
      modalVisible={tipsStore.modalOpened}
      onModalClose={this.closeModal.bind(this)}
    >

      <ScrollView
        style={{
          flex: 1,
          position: 'absolute',
          width: width - 40,
          maxHeight: height - 130
        }}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
      >
        <tipsStore.currentTips.component></tipsStore.currentTips.component>
      </ScrollView>
    </DarkModal>
  }
}

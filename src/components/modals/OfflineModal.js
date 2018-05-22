import {gs} from "../../globals";
import * as React from "react";
import {observer} from 'mobx-react';
import {withNavigationFocus} from 'react-navigation';
import {TouchableOpacity, Text} from "react-native";
import DarkModal from "../DarkModal";
import connectionStore from "../../store/connectionStore";
import subscriptionsStore from "../../store/subscriptionsStore";
import FontAwesome from "react-native-vector-icons/FontAwesome";


@observer
@withNavigationFocus
export default class OfflineModal extends React.Component {
  render() {
    return <DarkModal
      modalVisible={!subscriptionsStore.isSubscribed &&
      !connectionStore.connected && this.props.navigation.isFocused()}
    >
      <Text style={[gs.text, gs.shadow, {fontSize: 14, textAlign: 'center', color: '#999'}]}>
        You don't have internet connection!{'\n'}Get Asterius Premium to use offline!
      </Text>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          this.props.navigation.navigate('PremiumScreen');
        }}>
        <Text style={[gs.text, gs.shadow, {fontSize: 20, textAlign: 'center', color: '#ccc'}]}>
          <FontAwesome size={20} name={'star'}/>
          &nbsp; NEXT LEVEL
        </Text>
      </TouchableOpacity>
    </DarkModal>
  }
}
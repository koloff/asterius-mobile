import {gs} from "../../globals";
import * as React from "react";
import {TouchableOpacity, Text} from "react-native";
import DarkModal from "../DarkModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class NewUserModal extends React.Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({modalVisible: true});
    }, 1000)
  }

  render() {
    return <DarkModal
      modalVisible={this.state.modalVisible}
      onModalClose={() => {
        this.setState({modalVisible: false})
      }}
    >
      <Text style={[gs.text, gs.shadow, {fontSize: 14, textAlign: 'center', color: '#999'}]}>
        Read the training principles?
      </Text>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          this.setState({modalVisible: false});
          this.props.navigation.navigate('Principles');
        }}>
        <Text style={[gs.text, gs.shadow, {fontSize: 20, textAlign: 'center', color: '#ccc'}]}>
          <MaterialCommunityIcons size={20} name={'dumbbell'}/>
          &nbsp; SHOW ME
        </Text>
      </TouchableOpacity>
    </DarkModal>
  }
}
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, Text, View } from "react-native";

class TextInputBox extends Component {
  static propTypes = {
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    header: PropTypes.string
  };
  render() {
    const { header, placeholder, onChangeText } = this.props;
    return (
      <View>
        <Text style={styles.inputHeader}>{header}</Text>
        <TextInput style={styles.textInput} placeholder={placeholder}>
          {onChangeText}
        </TextInput>
      </View>
    );
  }
}
const mapStateToProps = ownProps => {
  return {
    ...ownProps
  };
};

const mapDispatchToProps = ownProps => {
  return {
    ...ownProps
  };
};
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 36,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 13,
    paddingLeft: 5,
    paddingLeft: 5
  },
  inputHeader: {
    fontSize: 20,
    paddingTop: 16,
    color: "#5A5A5A"
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextInputBox);

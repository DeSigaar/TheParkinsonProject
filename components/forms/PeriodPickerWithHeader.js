import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class PeriodPickerWithHeader extends Component {
  static propTypes = {
    header: PropTypes.string,
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    startText: PropTypes.any.isRequired,
    endText: PropTypes.any.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    header: "Kies periode",
    activeOpacity: 0.7
  };

  render() {
    const { header, activeOpacity, onPress, startText, endText, isVisible, onConfirm, onCancel } = this.props;

    return (
      <>
        <Text style={styles.header}>{header}</Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, styles.left]}
            onPress={() => onPress("start")}
            activeOpacity={activeOpacity}
          >
            <View style={styles.textCenter}>
              <Text style={[styles.boxText, styles.boxHeader]}>Startdatum</Text>
              <Text style={styles.boxText}>{startText}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.right]}
            onPress={() => onPress("end")}
            activeOpacity={activeOpacity}
          >
            <View style={styles.textCenter}>
              <Text style={[styles.boxText, styles.boxHeader]}>Einddatum</Text>
              <Text style={styles.boxText}>{endText}</Text>
            </View>
          </TouchableOpacity>
          <DateTimePicker isVisible={isVisible} onConfirm={date => onConfirm(date)} onCancel={() => onCancel()} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    marginTop: 14,
    marginBottom: 8
  },
  container: {
    height: 75,
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 14
  },
  button: {
    width: "50%",
    borderWidth: 1.5,
    borderColor: Colors.black
  },
  left: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
    marginRight: -1
  },
  right: {
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10
  },
  textCenter: {
    height: 75,
    justifyContent: "center",
    alignItems: "center"
  },
  boxText: {
    fontSize: 19,
    fontFamily: ProductSans.regular
  },
  boxHeader: {
    color: Colors.lightGrey
  }
});

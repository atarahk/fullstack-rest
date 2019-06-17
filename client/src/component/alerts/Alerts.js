import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon } from "react-native-elements";
import { remove_alert } from "../../redux/actions/alertActions";

const Alerts = (props) => {
  const { alert, remove_alert } = props;
  return (
    <TouchableWithoutFeedback onPress={() => remove_alert(alert.messageId)}>
      <View style={styles.containAlert}>
        <View style={styles.container}>
          <Text style={styles.text}>
            {alert.message}
          </Text>
        </View>
        <View style={styles.dismissIcon}>
          <Icon
            name='times'
            type='font-awesome'
            color='#a94442'
            size={10}
            iconStyle={{paddingTop: 7, paddingRight: 7}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 2,
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
  },
  text: {
    color: '#a94442'
  },
  dismissIcon: {
    backgroundColor: '#f2dede',
  },
  containAlert: {
    flexDirection: 'row'
  }
});

const mapStateToProps = ({ alertReducer }) => ({
  alerts: alertReducer.alerts,
});

export default connect(mapStateToProps, { remove_alert })(Alerts);
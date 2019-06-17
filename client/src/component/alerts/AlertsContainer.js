import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import Alert from "./Alerts";

class AlertsContainer extends Component {

  render() {
    const { alerts } = this.props;
    const renderAlerts = () => {
      return alerts.map(alert => {
        return (<Alert alert={alert} key={alert.messageId} />)
      });
    }
    return (
      <View style={styles.container}>
        {renderAlerts()}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  }
});

const mapStateToProps = ({ alertReducer }) => ({
  alerts: alertReducer.alerts,
});

export default connect(mapStateToProps, null)(AlertsContainer);
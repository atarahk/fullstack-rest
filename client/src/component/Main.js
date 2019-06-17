import React, { Component } from 'react'
import { connect } from 'react-redux'
import AlertsContainer from './alerts/AlertsContainer'
import Todo from './Todo'
import SignUp from './SignUp'
import Login from './Login'
import { View } from 'react-native'

class Main extends Component {
  render() {
    const renderMainView = () => {
      if (this.props.userId) {
        return <Todo />
      } else if (this.props.signup) {
        return <SignUp />
      } else {
        return <Login />
      }
    }

    return (
      <View style={{ flex: 1 }}>
        {renderMainView()}
        <AlertsContainer />
      </View>
    )
  }
}

const mapStateToProps = ({ authReducer }) => ({
  userId: authReducer.userId,
  signup: authReducer.signup
})

export default connect(
  mapStateToProps,
  null
)(Main)

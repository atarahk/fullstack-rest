import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { login_page, signupUser } from '../redux/actions/authActions'
import { add_alert } from '../redux/actions/alertActions'

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleSignUp = () => {
    const { username, email, password, confirmPassword } = this.state
    if (username && email && password && confirmPassword) {
      this.props.signupUser({ username, email, password, confirmPassword })
    } else {
      this.props.add_alert('Please fill in all fields')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Do-It</Text>
        </View>
        <View style={styles.containLoginForm}>
          <View style={styles.field}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#49beb7"
              onChangeText={text => this.setState({ username: text })}
              value={this.state.username}
              style={styles.textInput}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#49beb7"
              onChangeText={text => this.setState({ email: text })}
              value={this.state.email}
              style={styles.textInput}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#49beb7"
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
              value={this.state.password}
              style={styles.textInput}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#49beb7"
              secureTextEntry={true}
              onChangeText={text => this.setState({ confirmPassword: text })}
              value={this.state.confirmPassword}
              style={styles.textInput}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleSignUp}>
              <Text style={styles.loginButton}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.login_page}>
              <Text style={styles.signupButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 20,
    backgroundColor: '#49beb7'
  },
  titleContainer: {
    padding: 10,
    paddingTop: 40
  },
  title: {
    color: '#ffffff',
    fontSize: 35,
    alignSelf: 'center'
  },
  field: {
    borderRadius: 5,
    padding: 5,
    paddingLeft: 8,
    margin: 7,
    backgroundColor: '#ffffff'
  },
  textInput: {
    height: 40
  },
  loginButton: {
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: '#2F3D38',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  signupButton: {
    fontSize: 20,
    color: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  activeButton: {},
  containLoginForm: {
    marginTop: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  formError: {
    color: 'red'
  }
})

export default connect(
  null,
  { login_page, signupUser, add_alert }
)(SignUp)

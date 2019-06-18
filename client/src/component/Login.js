import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NetInfo,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux'
import { SecureStore } from 'expo'
import { register_page, loginUser } from '../redux/actions/authActions'
import { add_alert } from '../redux/actions/alertActions'

class Login extends Component {
  state = {
    email: '',
    password: '',
    remember: false
  }

  componentDidMount() {
    SecureStore.getItemAsync('loginDetails')
      .then(userdata => {
        let loginDetails = JSON.parse(userdata)
        if (loginDetails) {
          this.setState({ email: loginDetails.email })
          this.setState({ password: loginDetails.password })
          this.setState({ remember: true })
        }
      })
      .catch(error => {
        console.log('Error retrieving credentials')
      })
    NetInfo.getConnectionInfo().then(connectionInfo => {
      ToastAndroid.show(
        'Initial Network Connectivity Type: ' +
          connectionInfo.type +
          ', effectiveType: ' +
          connectionInfo.effectiveType,
        ToastAndroid.LONG
      )
    })

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange)
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange
    )
  }

  handleConnectivityChange = connectionInfo => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG)
        break
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG)
        break
      case 'cellular':
        ToastAndroid.show(
          'You are now connected to Cellular!',
          ToastAndroid.LONG
        )
        break
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG)
        break
      default:
        break
    }
  }

  handleLogIn = () => {
    const { email, password } = this.state
    if (email && password) {
      this.props.loginUser({ email, password })
      if (this.state.remember) {
        SecureStore.setItemAsync(
          'loginDetails',
          JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        ).catch(error => console.log('Could not save login info', error))
      } else {
        SecureStore.deleteItemAsync('loginDetails').catch(error =>
          console.log('Could not delete login info', error)
        )
      }
    } else {
      this.props.add_alert('Please fill in all fields')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Let's Do It</Text>
        </View>
        <View style={styles.containLoginForm}>
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
          <View>
            <CheckBox
              title="Remember Me"
              center
              checked={this.state.remember}
              onPress={() => this.setState({ remember: !this.state.remember })}
              containerStyle={styles.formCheckbox}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.handleLogIn}>
              <Text style={styles.loginButton}> Log In </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.register_page}>
              <Text style={styles.signupButton}>Sign Up</Text>
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
    borderWidth: 0.5,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5
  },
  signupButton: {
    fontSize: 20,
    color: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#ffffff',
    padding: 10,
    borderRadius: 5
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  activeButton: {},
  containLoginForm: {
    marginTop: 80,
    paddingLeft: 10,
    paddingRight: 10
  },
  formError: {
    color: 'red'
  },
  formCheckbox: {
    backgroundColor: '#49beb7',
    borderColor: '#49beb7'
  }
})

export default connect(
  null,
  { register_page, loginUser, add_alert }
)(Login)

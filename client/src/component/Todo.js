import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { createTodo, fetchTodos } from '../redux/actions/todoActions'
import TodoList from './TodoList'

import Icons from './Icons'
import plusIcon from '../../assets/plus.png'

class Todo extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.props.fetchTodos(this.props.userId)
  }

  addTodo = text => {
    if (text.length > 0) {
      this.props.createTodo(this.props.userId, text)
      Keyboard.dismiss()
    }
  }

  render() {
    const renderList = () => {
      if (this.props.todos.length > 0) {
        return (
          <View>
            <TodoList />
          </View>
        )
      } else {
        return (
          <View style={styles.message}>
            <Text style={styles.textMessage}>No items found.</Text>
            <Text style={styles.textMessage}>Let's do it.</Text>
          </View>
        )
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.containTopbar}>
          <View style={styles.topbar}>
            <Text style={styles.title}>A ToDo App</Text>
          </View>
        </View>

        <View style={styles.containForm}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add a todo..."
              placeholderTextColor="#49beb7"
              onChangeText={text => this.setState({ text })}
              onSubmitEditing={() => {
                this.addTodo(this.state.text)
              }}
              value={this.state.text}
              style={styles.formInput}
            />
          </View>

          <Icons
            onPress={() => {
              this.addTodo(this.state.text)
            }}
            source={plusIcon}
            style={styles.plusButton}
            width={30}
            height={30}
          />
        </View>
        {renderList()}
      </View>
    )
  }
}

const mapStateToProps = ({ todoReducer, authReducer }) => ({
  todos: todoReducer.todos,
  userId: authReducer.userId
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBCECA'
  },
  plusButton: {
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'flex-end'
  },
  containForm: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#49beb7',
    paddingTop: 10
  },
  inputContainer: {
    padding: 8,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 14,
    backgroundColor: '#49beb7'
  },
  formInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    height: 50,
    width: 300
  },
  message: {
    flex: 4,
    backgroundColor: '#CBCECA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMessage: {
    color: '#49beb7'
  },
  topbar: {
    flex: 8,
    padding: 16,
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#49beb7'
  },
  title: {
    color: 'white',
    fontSize: 20,
    paddingTop: 20,
    paddingLeft: 20
  },
  containTopbar: {
    flexDirection: 'row'
  }
})

export default connect(
  mapStateToProps,
  { createTodo, fetchTodos }
)(Todo)

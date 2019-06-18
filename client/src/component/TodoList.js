import React, { Component } from 'react'
import {
  FlatList,
  Button,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Swipeout from 'react-native-swipeout'
import { connect } from 'react-redux'
import {
  updateTodo,
  deleteTodo,
  fetchTodos
} from '../redux/actions/todoActions'
import { Loader } from './Loader'
import Icons from './Icons'
import updateIcon from '../../assets/update.png'
import check from '../../assets/check.png'
import uncheck from '../../assets/uncheck.png'

import Dimensions from 'Dimensions'
const DEVICE_WIDTH = Dimensions.get('window').width

class TodoList extends Component {
  state = {
    showModal: false,
    itemTextToEdit: '',
    itemIdToEdit: '',
    refreshing: false,
    isDone: false
  }

  handleEditItem = ({ _id, text, isDone }) => {
    this.setState({
      itemTextToEdit: text,
      itemIdToEdit: _id,
      showModal: true,
      isDone: isDone
    })
  }

  editItem = () => {
    const { itemIdToEdit, itemTextToEdit, isDone } = this.state
    const updatedItem = {
      id: itemIdToEdit,
      text: itemTextToEdit,
      isDone: isDone
    }
    this.props.updateTodo(this.props.userId, updatedItem)
    this.clearState()
  }

  onRefresh = () => {
    const { fetchTodos, userId } = this.props
    fetchTodos(userId)
  }

  toggleModal = () => {
    this.setState({ showModal: false })
  }

  clearState = () => {
    this.setState({
      itemIdToEdit: '',
      itemTextToEdit: ''
    })
  }

  editTodo = () => {
    const { itemIdToEdit, itemTextToEdit, isDone } = this.state
    const updatedItem = {
      id: itemIdToEdit,
      text: itemTextToEdit,
      isDone: !isDone
    }
    this.props.updateTodo(this.props.userId, updatedItem)
    this.clearState()
  }

  render() {
    console.log('date props => ', this.props)

    const renderTodoItem = ({ item, index }) => {
      const doneOrNot = item.isDone ? check : uncheck
      const lineOrNot = item.isDone ? 'line-through' : 'none'

      const swipeButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            this.props.deleteTodo(this.props.userId, item._id)
          }
        },
        {
          text: 'Edit',
          type: 'primary',
          onPress: () => {
            this.handleEditItem(item)
          }
        },
        {
          text: 'Mark',
          type: 'secondary',
          onPress: () => {
            this.handleEditItem(item)
          }
        }
      ]

      return (
        <Swipeout right={swipeButton} autoClose={true}>
          <Animatable.View
            animation="bounceInDown"
            duration={2000}
            style={styles.row}
          >
            <Icons
              source={doneOrNot}
              style={styles.leftButton}
              width={25}
              height={25}
            />
            <TouchableOpacity style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                key={index}
                style={{ textDecorationLine: `${lineOrNot}`, paddingLeft: 10 }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </Swipeout>
      )
    }

    const renderResult = () => {
      if (this.props.error) {
        return (
          <View>
            <Text>{this.props.error}</Text>
          </View>
        )
      } else {
        return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          >
            <FlatList
              data={this.props.todos}
              renderItem={renderTodoItem}
              keyExtractor={item => item._id.toString()}
            />
            <View>
              <Modal
                animationType={'fade'}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => this.toggleModal()}
                onRequestClose={() => this.toggleModal()}
              >
                <View style={styles.modal}>
                  <TextInput
                    placeholder={this.state.itemTextToEdit}
                    onChangeText={text =>
                      this.setState({ itemTextToEdit: text })
                    }
                    value={this.state.itemTextToEdit}
                    autoCorrect={false}
                    spellCheck={false}
                    style={styles.formInput}
                  />
                  <Button
                    onPress={() => {
                      this.editTodo(this.state.isDone)
                      this.toggleModal()
                    }}
                    title={
                      this.state.isDone
                        ? 'Click Me UnMark The Task'
                        : 'Click Me Mark The Task'
                    }
                  />
                  <Icons
                    onPress={() => {
                      this.editItem(this.state.itemTextToEdit)
                      this.toggleModal()
                    }}
                    source={updateIcon}
                    width={50}
                    height={50}
                    style={{ paddingTop: 50 }}
                  />
                </View>
              </Modal>
            </View>
          </ScrollView>
        )
      }
    }
    return this.props.isFetching ? <Loader /> : renderResult()
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fcf9ec',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 10,
    marginVertical: 1,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  formInput: {
    borderRadius: 10,
    backgroundColor: '#CBCECA',
    color: '#49beb7',
    padding: 30,
    fontSize: 30,
    width: DEVICE_WIDTH - 50
  }
})

const mapStateToProps = ({ todoReducer, authReducer }) => ({
  userId: authReducer.userId,
  todos: todoReducer.todos,
  error: todoReducer.error,
  isFetching: todoReducer.isFetching
})

export default connect(
  mapStateToProps,
  { updateTodo, deleteTodo, fetchTodos }
)(TodoList)

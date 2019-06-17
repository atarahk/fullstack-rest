import React from 'react'
import { Provider } from 'react-redux'
import Main from './src/component/Main'
import configureStore from './src/redux/configureStore'

const store = configureStore()
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

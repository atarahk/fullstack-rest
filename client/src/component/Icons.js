import React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'

const Icons = props => {
  const { style, onPress, source, width, height } = props

  const _onPress = () => onPress()

  return (
    <View style={style}>
      <TouchableWithoutFeedback
        onPress={_onPress}
        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
      >
        <Image source={source} style={{ width, height }} />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Icons

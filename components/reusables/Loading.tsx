import { FC } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading: FC = () => {
  return (
    <View style={style.wrapper}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading
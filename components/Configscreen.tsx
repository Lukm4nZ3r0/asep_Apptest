import { Switch, VStack } from "native-base"
import { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { actions } from "../store/reducers/configs"
import { ComponentProps } from "../types"

const Configscreen: FC<ComponentProps<'Configuration'>> = () => {
  const config = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()
  return (
    <View style={style.wrapper}>
      <VStack style={{...style.box, ...style.boxSingle, backgroundColor: config.listColor}}>
        <Text style={{...style.info, color: config.fontColor}}>Dark Mode</Text>
        <Switch isChecked={config.theme === "dark"} onToggle={(args)=>dispatch(actions.setTheme(args as boolean ? "dark" : "light"))} colorScheme={config.theme} />
      </VStack>
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    width: "95%",
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  boxSingle: {
    borderRadius: 10,
  },
  boxFirst: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 1,
  },
  boxMid: {
    marginTop: 1,
    marginBottom: 1,
  },
  boxLast: {
    marginTop: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  info: {
    fontSize: 14
  }
})

export default Configscreen
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Text } from "native-base"
import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { RootStackParamList } from "../../types"

const HeaderConfigLeft: FC = () => {
  const config = useSelector((state: RootState) => state.config)
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()

  return <Text style={{color: config.menuSelectedColor}} onPress={()=>navigation.navigate("Configuration")}>Config</Text>
}

export default HeaderConfigLeft
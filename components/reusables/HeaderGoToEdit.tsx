import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Text } from "native-base"
import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { RootStackParamList } from "../../types"

const HeaderGoToEdit: FC = () => {
  const config = useSelector((state: RootState) => state.config)
  const contact = useSelector((state: RootState) => state.contact)
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()

  return <Text onPress={()=>navigation.navigate("Create", contact.formContact)} style={{color: config.menuSelectedColor}}>Edit</Text>
}

export default HeaderGoToEdit
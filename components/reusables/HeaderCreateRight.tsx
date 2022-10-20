import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AddIcon } from "native-base"
import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { RootStackParamList } from "../../types"

const HeaderCreateRight: FC = () => {
  const config = useSelector((state: RootState) => state.config)
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()

  return <AddIcon onPress={()=>navigation.navigate("Create")} style={{color: config.menuSelectedColor}} />
}

export default HeaderCreateRight
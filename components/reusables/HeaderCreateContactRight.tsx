import { NavigationProp, useNavigation } from "@react-navigation/native"
import { AddIcon, Text } from "native-base"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveOrEditContact } from "../../services"
import { RootState } from "../../store"
import { actions } from "../../store/reducers/contacts"
import { RootStackParamList } from "../../types"

const HeaderCreateContactRight: FC = () => {
  const config = useSelector((state: RootState) => state.config)
  const contact = useSelector((state: RootState) => state.contact)
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()
  const dispatch = useDispatch()

  const onPressListener = () => {
    saveOrEditContact(contact.formContact)
      .then(()=>{
        navigation.navigate("Home")
      })
      .catch((err)=>{
        console.log(err)
        dispatch(actions.addContact(contact.formContact))
      })
  }
  if(contact.formContact.id) return <Text onPress={()=>onPressListener()} style={{color: config.menuSelectedColor}}>Edit</Text>
  else return <AddIcon onPress={()=>onPressListener()} style={{color: config.menuSelectedColor}} />
}

export default HeaderCreateContactRight
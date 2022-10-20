import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native"
import { Button, Image, VStack } from "native-base"
import { FC, useCallback, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { deleteContactById, getContactById } from "../services"
import { RootState } from "../store"
import { actions } from "../store/reducers/contacts"
import { ComponentProps, RootStackParamList } from "../types"
import Loading from "./reusables/Loading"

const DetailContactscreen: FC<ComponentProps<'Detail'>> = (props) => {
  const [loading, setLoading] = useState(false)
  const config = useSelector((state: RootState) => state.config)
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()
  const { formContact } = useSelector((state: RootState) => state.contact)
  const dispatch = useDispatch()

  useFocusEffect(
    useCallback(() => {
      if(props.route.params?.id) {
        setLoading(true)
        getContactById(props.route.params?.id)
          .then(res => {
            if(res.data) dispatch(actions.editFormContact(res.data))
          })
          .catch((err) => {
            dispatch(actions.editFormContact(props.route.params))
            console.log(err)
          })
          .finally(()=>setLoading(false))
      }

      const unsubscribe = () => dispatch(actions.resetFormContact())

      return () => unsubscribe();
    }, [props.route.params?.id])
  )

  const deleteHandler = () => {
    if(formContact.id) {
      deleteContactById(formContact.id)
        .then(()=>{
          if(formContact.id) dispatch(actions.removeContact(formContact.id))
        })
        .catch((err)=>console.log(err))
        .finally(()=>navigation.navigate("Home"))
    }
  }

  return (
    <View style={style.wrapper}>
      {formContact.photo ? 
        <Image 
          style={style.imageWrapper}
          source={{uri: formContact.photo}} 
          alt="image" 
        />
        : 
        <View style={style.imageWrapper}>
          <Text style={style.imageWrapperText}>{[formContact.firstName?.charAt(0).toUpperCase(), formContact.lastName?.charAt(0).toUpperCase()].join("") ?? "?"}</Text>
        </View>
      }
      <Text style={{...style.title, color: config.fontColor}}>{[formContact.firstName, formContact.lastName].join(" ")}</Text>
      <Text style={{...style.description, color: config.fontColor}}>Person</Text>
      <VStack style={{...style.box, ...style.boxFirst, backgroundColor: config.listColor}}>
        <Text style={{...style.info, color: config.fontColor}}>First Name</Text>
        <Text style={{...style.info, color: config.fontColor}}>{formContact.firstName}</Text>
      </VStack>
      <VStack style={{...style.box, ...style.boxMid, backgroundColor: config.listColor}}>
        <Text style={{...style.info, color: config.fontColor}}>Last Name</Text>
        <Text style={{...style.info, color: config.fontColor}}>{formContact.lastName}</Text>
      </VStack>
      <VStack style={{...style.box, ...style.boxLast, backgroundColor: config.listColor}}>
        <Text style={{...style.info, color: config.fontColor}}>Age</Text>
        <Text style={{...style.info, color: config.fontColor}}>{formContact.age}</Text>
      </VStack>
      {loading ? <Loading /> : <Button style={style.deleteBtn} colorScheme="error" onPress={()=>deleteHandler()}>Delete this contact</Button>}
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center'
  },
  imageWrapper: {
    borderRadius: 200,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  imageWrapperText: {
    color: 'white',
    fontSize: 70
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20
  },
  description: {
    fontSize: 14,
    marginBottom: 50
  },
  box: {
    width: "95%",
    height: 40,
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
  },
  deleteBtn: {
    width: "95%",
    marginTop: 25
  }
})

export default DetailContactscreen
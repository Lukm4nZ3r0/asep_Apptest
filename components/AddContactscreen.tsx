import { Image, InfoIcon, Input, Stack } from "native-base"
import { FC, useCallback, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { ComponentProps } from "../types"
import { actions } from "../store/reducers/contacts"
import { useFocusEffect } from "@react-navigation/native"
import { getContactById } from "../services"
import Loading from "./reusables/Loading"

const AddContactscreen: FC<ComponentProps<'Create'>> = (props) => {
  const [loading, setLoading] = useState(false)
  const config = useSelector((state: RootState) => state.config)
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
      {loading ?
        <Loading />
        :
        <Stack 
          space={4} 
          w="100%" 
          alignItems="center"
          mt={10}
          mb={2}
        >
          <Input 
            width="95%"
            InputLeftElement={<InfoIcon ml={2} />} 
            color={config.fontColor}
            borderColor={config.bgColor}
            borderRadius={10}
            backgroundColor={config.listColor}
            placeholder="First Name" 
            fontSize={14}
            value={formContact.firstName}
            onChangeText={(text)=>dispatch(actions.editFormContact({firstName: text}))}
          />
          <Input 
            width="95%"
            InputLeftElement={<InfoIcon ml={2} />} 
            color={config.fontColor}
            borderColor={config.bgColor}
            borderRadius={10}
            backgroundColor={config.listColor}
            placeholder="Last Name" 
            fontSize={14}
            value={formContact.lastName}
            onChangeText={(text)=>dispatch(actions.editFormContact({lastName: text}))}
          />
          <Input 
            width="95%"
            InputLeftElement={<InfoIcon ml={2} />} 
            color={config.fontColor}
            borderColor={config.bgColor}
            borderRadius={10}
            backgroundColor={config.listColor}
            keyboardType="numeric"
            placeholder="Age" 
            fontSize={14}
            value={formContact.age.toString()}
            onChangeText={(text)=>dispatch(actions.editFormContact({age: !isNaN(Number(text)) ? Number(text) : 0}))}
          />
          <Input 
            width="95%"
            InputLeftElement={<InfoIcon ml={2} />} 
            color={config.fontColor}
            borderColor={config.bgColor}
            borderRadius={10}
            backgroundColor={config.listColor}
            placeholder="Photo URL" 
            fontSize={14}
            value={formContact.photo}
            onChangeText={(text)=>dispatch(actions.editFormContact({photo: text}))}
          />
        </Stack>
      }
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  imageWrapper: {
    borderRadius: 100,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'gray',
  },
  imageWrapperText: {
    color: 'white',
    fontSize: 38
  },
})

export default AddContactscreen
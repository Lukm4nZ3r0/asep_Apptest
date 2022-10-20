import { FC, useEffect, Fragment, useMemo, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { RootState } from "../store"
import { ComponentProps, Contact, RootStackParamList } from "../types"
import { useSelector, useDispatch } from 'react-redux'
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import { actions } from "../store/reducers/contacts"
import { getContacts } from "../services"
import BottomMenu from "./reusables/BottomMenu"
import { Box, Button, FlatList, Image, Input, ScrollView, SearchIcon, Stack, VStack } from "native-base"
import Loading from "./reusables/Loading"

const Homescreen: FC<ComponentProps<'Home'>> = () => {
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState<string>("")
  const isFocused = useIsFocused();
  const state = useSelector((state: RootState) => state.contact)
  const config = useSelector((state: RootState) => state.config)
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()

  const init = () => {
    if(isFocused) {
      setLoading(true)
      getContacts()
        .then(res => {
          if(res.data) dispatch(actions.addContacts(res.data))
        })
        .catch(err => console.log(err))
        .finally(()=>setLoading(false))
    }
  }

  useEffect(init, [isFocused])

  const getBorderRadius = (contacts: Array<Contact>, index: number) => {
    if(contacts.length === 1) return style.boxSingle
    else {
      if(index === 0) return style.boxFirst
      else if(index >= contacts.length - 1) return style.boxLast
      else return style.boxMid
    }
  }

  const contactRenderer = useMemo(() => {
    let contacts: Array<{letter: string, contacts: Array<Contact>}> = []
    const filteredContact = [...state.contacts].filter(contact => [contact.firstName, contact.lastName].join(" ").toLowerCase().includes(keyword.toLowerCase()))

    filteredContact.forEach((contact, index) => {
      if(index === 0) {
        contacts = [{
          letter: contact.firstName?.charAt(0).toUpperCase(),
          contacts: [contact]
        }]
      }
      else {
        const findSelectedIndex = contacts.findIndex(c => c.letter === contact.firstName?.charAt(0).toUpperCase())
        if(findSelectedIndex > -1) contacts[findSelectedIndex].contacts = [...contacts[findSelectedIndex].contacts, contact]
        else contacts = [...contacts, {
          letter: contact.firstName?.charAt(0).toUpperCase(),
          contacts: [contact]
        }]
      }
    })

    return contacts
  }, [state.contacts, keyword])

  return (
    <Fragment>
      <View style={style.wrapper}>
        <Text style={{...style.vStack, ...style.title, color: config.fontColor}}>Contact</Text>
        <Stack 
          space={4} 
          w="100%" 
          alignItems="center"
          mt={2}
          mb={2}
        >
          <Input 
            width="95%"
            InputLeftElement={<SearchIcon ml={2} />} 
            color={config.fontColor}
            borderColor={config.bgColor}
            borderRadius={10}
            backgroundColor={config.listColor}
            placeholder="Search" 
            fontSize={14}
            value={keyword}
            onChangeText={(text)=>setKeyword(text)}
          />
        </Stack>
        {loading ? 
          <Loading />
          :
          <FlatList 
            data={contactRenderer}
            renderItem={(parent)=>{
              return (
                <VStack key={parent.index}>
                  <Text style={{...style.vStack, color: config.menuSelectedColor}}>{parent.item.letter}</Text>
                  <FlatList 
                    style={style.vStack}
                    data={parent.item.contacts}
                    renderItem={({item,index}) =>{
                      const name = [item.firstName, item.lastName].join(" ")
                      return (
                        <Button 
                          key={index} 
                          style={{...style.box, ...getBorderRadius(parent.item.contacts, index), backgroundColor: config.listColor}}
                          leftIcon={!!item.photo && item.photo !== "N/A" ? 
                            <Image 
                              style={style.imageWrapper}
                              source={{uri: item.photo}} 
                              alt="image" 
                            />
                            : 
                            <View style={style.imageWrapper}>
                              <Text style={style.imageWrapperText}>{[item.firstName?.charAt(0).toUpperCase(), item.lastName.charAt(0).toUpperCase()].join("")}</Text>
                            </View>
                          }
                          onPress={()=>navigation.navigate("Detail", item)}
                        >
                          <Text style={{...style.name, color: config.fontColor}}>{name}</Text>
                        </Button>
                      )
                    }}
                  />
                </VStack>
              )
            }}
          />
        }
      </View>
    </Fragment>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  vStack: {
    marginTop: 10,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  box: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  imageWrapper: {
    borderRadius: 35,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'gray',
  },
  imageWrapperText: {
    color: 'white',
    fontSize: 18
  },
  name: {
    fontSize: 14
  }
})

export default Homescreen
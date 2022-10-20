import { Center, HStack, Pressable, Text } from 'native-base'
import { FC } from 'react'
import { menus } from '../../App'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../types'

const BottomMenu: FC = (props) => {
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()
  const router = useRoute()

  const state = useSelector((state: RootState) => state.config)
  return (
    <HStack style={{backgroundColor: state.listColor}} alignItems="center" height={50}>
      {menus.map((menu, index) =>
        menu.isBottomMenu &&
        <Pressable 
          key={index} 
          opacity={1} 
          py="3" 
          flex={1} 
          onPress={() => navigation.navigate(menu.name)}
          disabled={menu.name === router.name}
        >
          <Center>
            {menu.icon && <menu.icon mb=".5" name="search" color={menu.name === router.name ? state.menuSelectedColor : state.menuUnSelectedColor} size="md" />}
            <Text color={menu.name === router.name ? state.menuSelectedColor : state.menuUnSelectedColor} fontSize="12" fontWeight={600}>
              {menu.name}
            </Text>
          </Center>
        </Pressable>
      )}
    </HStack>
  )
}

export default BottomMenu
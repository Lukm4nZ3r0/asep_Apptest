/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC, MemoExoticComponent, ForwardRefExoticComponent, RefAttributes } from 'react';
import { DefaultTheme, NavigationContainer, NavigationProp, RouteProp, Theme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './components/Homescreen';
import { ComponentProps, RootStackParamList } from './types';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './store';
import { NativeBaseProvider, SearchIcon, HamburgerIcon, AddIcon, Text, View, ArrowBackIcon } from "native-base";
import Configscreen from './components/Configscreen';
import AddContactscreen from './components/AddContactscreen';
import HeaderConfigLeft from './components/reusables/HeaderConfigLeft';
import HeaderCreateRight from './components/reusables/HeaderCreateRight';
import HeaderCreateContactRight from './components/reusables/HeaderCreateContactRight';
import DetailContactscreen from './components/DetailContactscreen';
import HeaderGoToEdit from './components/reusables/HeaderGoToEdit';

const Stack = createNativeStackNavigator<RootStackParamList>();

export interface OptionProps {
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
  navigation: any;
}

interface Menu {
  name: keyof RootStackParamList;
  component: FC<ComponentProps<keyof RootStackParamList>>;
  isBottomMenu?: boolean;
  isModalMenu?: boolean;
  icon?: MemoExoticComponent<ForwardRefExoticComponent<Pick<any, string | number | symbol> & RefAttributes<unknown>>>;
  options?: {} | ((props: OptionProps) => {})
}

export const HeaderBackground: FC = () => {
  const config = useSelector((state: RootState) => state.config)

  return <View style={{backgroundColor: config.bgColor, width: '100%', height: '100%'}} />
}
export const HeaderGoBack: FC = () => {
  const config = useSelector((state: RootState) => state.config)
  const navigation = useNavigation<NavigationProp<any, keyof RootStackParamList>>()

  return <ArrowBackIcon onPress={()=>navigation.goBack()} style={{color: config.menuSelectedColor}} />
}

export const menus: Array<Menu> = [
  { 
    name: "Home", 
    component: Homescreen as FC<ComponentProps<keyof RootStackParamList>>, 
    isBottomMenu: true, 
    icon: SearchIcon,
    options:{ 
      headerTitle: () => null,
      headerBackground: () => <HeaderBackground />,
      headerShadowVisible: false,
      headerLeft: () => <HeaderConfigLeft />,
      headerRight: () => <HeaderCreateRight />,
    }
  },
  { 
    name: "Configuration", 
    component: Configscreen as FC<ComponentProps<keyof RootStackParamList>>, 
    isBottomMenu: true, 
    icon: HamburgerIcon,
    options: {
      headerTitle: () => null,
      headerBackground: () => <HeaderBackground />,
      headerShadowVisible: false,
      headerLeft: () => <HeaderGoBack />
    },
    isModalMenu: true
  },
  { 
    name: "Create", 
    component: AddContactscreen as FC<ComponentProps<keyof RootStackParamList>>,
    options: {
      headerTitle: () => null,
      headerBackground: () => <HeaderBackground />,
      headerShadowVisible: false,
      headerLeft: () => <HeaderGoBack />,
      headerRight: () => <HeaderCreateContactRight />
    },
    isModalMenu: true
  },
  { 
    name: "Detail", 
    component: DetailContactscreen as FC<ComponentProps<keyof RootStackParamList>>,
    options: {
      headerTitle: () => null,
      headerBackground: () => <HeaderBackground />,
      headerShadowVisible: false,
      headerLeft: () => <HeaderGoBack />,
      headerRight: () => <HeaderGoToEdit />
    },
    isModalMenu: true
  },
]

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  );
};

const Navigator: FC = () => {
  const config = useSelector((state: RootState) => state.config)

  const myTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: config.bgColor,
    }
  }

  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator>
        <Stack.Group>
          {menus.filter(menu => !menu.isModalMenu).map((menu, index)=>
            <Stack.Screen 
              key={index} 
              name={menu.name} 
              component={menu.component} 
              options={menu.options} 
            />
          )}
        </Stack.Group>
        {menus.filter(menu => menu.isModalMenu).length > 0 &&
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            {menus.filter(menu => menu.isModalMenu).map((menu, index)=>
              <Stack.Screen 
                key={index} 
                name={menu.name} 
                component={menu.component} 
                options={menu.options} 
              />
            )}
          </Stack.Group>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

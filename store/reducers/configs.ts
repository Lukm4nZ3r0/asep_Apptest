import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ColorSchemeName, Appearance } from 'react-native'

export interface ConfigInitialState {
  theme: ColorSchemeName;
  listColor: string;
  fontColor: string;
  bgColor: string;
  menuSelectedColor: string;
  menuUnSelectedColor: string;
}

const initialState: ConfigInitialState = {
  theme: Appearance.getColorScheme(),
  listColor: Appearance.getColorScheme() === "light" ? "#F2F1F5" : "#1C1B1F",
  fontColor: Appearance.getColorScheme() === "light" ? "#47464A" : "#D1D1D1",
  bgColor: Appearance.getColorScheme() === "light" ? "#FFFFFF" : "#010101",
  menuSelectedColor: Appearance.getColorScheme() === "light" ? "#4B71F9" : "#4B70FC",
  menuUnSelectedColor: Appearance.getColorScheme() === "light" ? "#949294" : "#767676",
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      state.theme = action.payload

      state.listColor = action.payload === "light" ? "#F2F1F5" : "#1C1B1F"
      state.fontColor = action.payload === "light" ? "#47464A" : "#D1D1D1"
      state.bgColor = action.payload === "light" ? "#FFFFFF" : "#010101"
      state.menuSelectedColor = action.payload === "light" ? "#4B71F9" : "#4B70FC"
      state.menuUnSelectedColor = action.payload === "light" ? "#949294" : "#767676"
    }
  }
})

export const actions = configSlice.actions
export default configSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Contact } from '../../types'
import 'react-native-get-random-values';
import { v4 } from 'uuid'

export interface CustomInitialState {
  contacts: Array<Contact>;
  formContact: Contact;
}

export const formContact: Contact = {
  firstName: "",
  lastName: "",
  age: 0,
  photo: ""
}

const initialState: CustomInitialState = {
  contacts: [],
  formContact
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContacts: (state, action: PayloadAction<Array<Contact>>) => {
      state.contacts = action.payload
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      if(!action.payload.id) action.payload.id = v4()
      state.contacts = [...state.contacts, action.payload]
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const getSelectedIndex = state.contacts.findIndex(contact => contact.id === action.payload.id)
      if(getSelectedIndex > -1) state.contacts[getSelectedIndex] = action.payload
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
    },
    editFormContact: (state, actions: PayloadAction<Partial<Contact>>) => {
      state.formContact = {...state.formContact, ...actions.payload}
    },
    resetFormContact: (state) => {
      state.formContact = formContact
    }
  }
})

export const actions = contactSlice.actions
export default contactSlice.reducer
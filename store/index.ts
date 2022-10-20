import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './reducers/contacts'
import configReducer from './reducers/configs'

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    config: configReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
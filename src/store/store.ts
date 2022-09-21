import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todosReducer from './reducers/TodosSlice'

const rootReducer = combineReducers({
  todos : todosReducer
})

export const store = configureStore({
  reducer: rootReducer
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { combineReducers, createStore } from "redux";
import { CombineReducer } from "./CombineReducer";
import { persistReducer,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, CombineReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store) 

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // Import combineReducers from Redux
import userSlice from "./user/userSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web

// Persist configuration
const persistConfig = {
  key: "root", // Key to persist data in storage
  storage, // Storage mechanism (localStorage in this case)
};

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,

});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks
    }),
});

// Export the store and persistor
export const persistor = persistStore(store);
export default store;

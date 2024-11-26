import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // Import combineReducers from Redux
import userSlice from "./user/userSlice.js";
import themeSlice from "./theme/themeSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web

// Persist configuration
const persistConfig = {
  key: "root", // Key to persist data in storage
  storage, // Storage mechanism (localStorage in this case)
  version:1,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
    }),
});

// Export the store and persistor
export const persistor = persistStore(store);
export default store;

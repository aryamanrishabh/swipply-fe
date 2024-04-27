import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import { HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./slices";

const persistConfig = {
  storage,
  key: "swipply-fe",
  whitelist: ["auth"],
};

const reducer = (state, action) => {
  if (action.type === "persist/REHYDRATE") {
    return { ...state };
  } else if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      auth: action.payload.auth,
    };

    return nextState;
  }

  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

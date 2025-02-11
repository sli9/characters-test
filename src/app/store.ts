import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { charactersApi } from '../features/characters/api/charactersApi.ts';
import { characterApi } from '../features/character-info/api/characterInfoApi.ts';

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      charactersApi.middleware,
      characterApi.middleware
    ),
});

setupListeners(store.dispatch);

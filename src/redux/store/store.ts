import { configureStore} from '@reduxjs/toolkit';
import rootReducer  from '../rootReducer';
import * as reduxThunk from "redux-thunk/extend-redux";


const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

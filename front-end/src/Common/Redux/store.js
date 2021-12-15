import { createStore } from "redux";
import rootReducer from "./reducer";
import {composeWithDevTools} from 'redux-devtools-extension'

let preloadedState = {}; //inital state that you would use if you were to login etc.
const composedEnhancer = composeWithDevTools()
export const store = createStore(rootReducer, composedEnhancer);

import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import Reducers from "./rootReducer"
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(){
    const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
    const store =  createStore(Reducers, composedEnhancer)
    return store;
}
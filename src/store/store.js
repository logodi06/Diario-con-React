
  import { createStore, combineReducers, applyMiddleware, compose } from "redux";
  import thunk from 'redux-thunk'
import { authReducer } from "../reducers/authReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//se crean todos los reducers a utilizar
const reducers = combineReducers({
    auth: authReducer
});

//se crea el storage
//aquí solo se puede mandar un solo reducer,  por eso se crea reducers para que ahí esten varios reducers
  export const store = createStore(
        reducers,
        //esta configuración de applyMiddleware es la se tiene que hacer para trabajar con peticiones asincronas
        composeEnhancers(
          applyMiddleware(thunk)
        )
);
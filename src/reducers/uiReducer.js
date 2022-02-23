import { types } from "../tytpes/types";

const initialState = {
    //cuaando se carga la aplicación está en falase
    loading: false,
    msgError: null
}

//esta acción es sincrona
export const uiReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.uiSetError:   
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
            
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}